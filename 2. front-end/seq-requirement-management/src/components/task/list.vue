<template>
  <section class="task-list">
    <div class="list-header float-wrap">
      <p class="cnt">{{tasks.length}}개의 task가 존재합니다.</p>
      <div class="color-description">
        <a href="#" class="btn mini" @click.prevent="mine = !mine" v-html="mine ? '전체' : '담당'" :class="mine ? 'default' : 'submit'" />
        <a href="#" class="btn mini" @click.prevent="folding = !folding" v-html="folding ? '접기' : '열기'" :class="folding ? 'default' : 'submit'" />
        <span v-for="(txt, key) in ['진행', '완료', '에러']" class="color-label workflow" :class="`color${key + 1} ${colorState === key ? 'active' : ''}`" :key="key"> 
          <span @click="workflowSelect(key)" v-html="txt" />
        </span>
      </div>
    </div>
    <div v-if="tasks.length">
      <div class="matching" v-if="$parent.matching.state">
        <div>[{{$parent.matching.commit.message}}] 과 매칭할 Task를 선택해주세요</div>
        <div class="btns">
          <a href="#" class="btn white mini" @click.prevent="matchingComplete" v-if="matchList.length">완료</a>
          <a href="#" class="btn white mini" @click.prevent="matchingOff">취소</a>
        </div>
      </div>
      <ul class="float-wrap">
        <li v-for="(task, key) in tasks"
            v-if="(colorState === null || (colorState !== null && task.state === colorState)) && getMine(task.midxs)"
            :key="key">
          <taskCard :task="task" :folding="folding" />
        </li>
      </ul>
    </div>
    <p class="none" v-else>task가 존재하지 않습니다.</p>
  </section>
</template>

<script>
  import Task from '@/middleware/Task.js'
  import Api from '@/middleware/Api.js'
  import taskCard from './card'

  export default {
    async created () {
      Task.init(this)
      Task.getList()
    },
    components: { taskCard },
    computed: { 
      tasks () {
        return this.$store.state.taskList
      }
    },
    data () {
      return {
        matchList: [],
        colorState: null,
        folding: false,
        mine: false
      }
    },
    methods: {
      matchSelect (tidx) {
        const matchList = this.matchList
        const index = matchList.indexOf(tidx)
        index === -1 ? matchList.push(tidx) : matchList.splice(index, 1)
        this.$forceUpdate()
      },
      async matchingComplete () {
        const params = this.$parent.matching.commit
        params.register_date = this.moment(new Date(params.register_date)).format('YYYY-MM-DD HH:mm:00')
        params.tidx = this.matchList.toString()
        const data = await this.getApiData(Api.postTaskCommit(params))
        if (data.msg) {
          alert(data.msg)
          return
        }
        alert('task와 commit을 매칭하였습니다.')
        this.matchList = []
        this.matchingOff()
      },
      matchingOff () {
        this.matchList = []
        this.$parent.matchingOff()
      },
      workflowSelect(color){
        this.colorState = color === this.colorState ? null : color
      },
      getMine (midxs) {
        return !this.mine || (this.mine && midxs && midxs.indexOf(this.$store.state.member.midx) !== -1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .task-list{
    li{width:33%;float:left;margin-bottom:0.5%;
      @include pc () {
        &:nth-child(3n-1){margin:0 0.5%;};
      }
    }
    .matching{border-radius:3px;background:#333;padding:10px;cursor:pointer;position:relative;margin-bottom:10px;color:#fff;display:flex;justify-content:space-between;align-items:center;
    }
  }
  .list-header{border-radius:3px;background:#fff;border:1px solid #ddd;padding:10px;margin-bottom:5px;
    .btn.mini{margin-right:3px;}
  }
  .cnt{float:left;}
  .color-description{float:right;
    span{padding:0 5px;}
  }
  .none{background:#fff;border:1px solid #ddd;padding:10px;border-radius:3px;}
  .workflow{cursor:pointer;
    &.active{background:#f5f5f5;border-radius:10px;}
  }
  @include tablet () {
    .task-list{
      li{width:49.5%;margin-bottom:1%;
        &:nth-child(2n){margin-left:1%;}
      }
      .matching{position:fixed;left:0;right:0;top:50px;border-radius:3px;margin-bottom:0;color:#fff;z-index:40;background:fade-out(#333, 0.2);}
    }
  }
  @include mobile () {
    .task-list{
      li{width:auto;float:none;margin-bottom:1%;
        &:nth-child(2n){margin-left:0;}
      }
      .matching{display:block;
        .btns{margin-top:5px;}
      }
    }
    .cnt{float:none;}
    .color-description{float:none;margin-top:5px;
      span{padding:0 5px;}
    }
  }
</style>