<template>
  <section class="task-list">
    <div class="list-header float-wrap">
      <p class="cnt">{{tasks.length}}개의 task가 존재합니다.</p>
      <div class="color-description">
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
        <li v-for="(task, key) in tasks" :key="key" v-if="colorState === null || (colorState !== null && task.state === colorState)">
          <dl @click.prevent="$parent.matching.state ? matchSelect(task.tidx) : $router.push(`/task/view/${task.tidx}`)"
              :class="{active: matchList.indexOf(task.tidx) !== -1}">
            <dt class="title">
              <span :class="`color-label color${task.state + 1}`" />
              <span class="task-name" v-html="task.title" />
              <span class="comment_cnt" v-html="task.comment_cnt" />
            </dt>
            <dd>
              <p class="list-content">
                <span class="icon"><i class="fas fa-align-left"></i></span>
                <span v-html="contentPreview(task.description, 20)" />
              </p>
              <p class="date range">
                <span class="icon"><i class="far fa-clock"></i></span>
                <span v-html="getRange(task.start_date, task.limit_date)" />
                <span class="remaining"
                      :class="getRemaining(task.limit_date, false) < 0 ? 'before' : 'after'"
                      v-html="getRemaining(task.limit_date)" />
              </p>
              <p class="date register">
                <span class="icon"><i class="far fa-calendar-alt"></i></span>
                <span>{{moment(task.register_date).format('M. D HH:mm')}}</span>
              </p>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <p class="none" v-else>task가 존재하지 않습니다.</p>
  </section>
</template>

<script>
  import Task from '@/middleware/Task.js'
  import Api from '@/middleware/Api.js'

  export default {
    async created () {
      Task.init(this)
      Task.getList()
    },
    computed: { 
      tasks () {
        return this.$store.state.taskList
      }
    },
    data () {
      return {
        matchList: [],
        colorState: null
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
    dl{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;cursor:pointer;position:relative;
      &:hover,
      &.active{border-color:#444;}
    }
    .title{font-size:15px;display:flex;align-items:center;}
    .comment_cnt{display:inline-block;vertical-align:middle;font-size:11px;margin-left:10px;background:#ededee;color:#586069;padding:2px 5px;line-height:1;border-radius:20px;font-weight:600;}
    .date{font-size:11px;color:#666;margin-top:3px;}
    .icon{display:inline-block;width:11px;text-align:center;margin-right:5px;font-size:11px;
      i{margin-top:-3px;}
    }
    .task-bottom{position:absolute;bottom:20px;left:20px;font-size:13px;
      p+p{margin-top:5px;}
      strong{color:$color1;display:inline-block;width:50px;font-weight:normal}
    }
    .remaining{display:inline-block;margin-left:10px;
      &.before{color:$color-google}
      &.after{color:$color-facebook}
    }
  }
  .list-content{margin:10px 0;word-break:break-all;}
  .list-header{border-radius:3px;background:#fff;border:1px solid #ddd;padding:10px;margin-bottom:5px;}
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
      dl{padding:10px;}
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