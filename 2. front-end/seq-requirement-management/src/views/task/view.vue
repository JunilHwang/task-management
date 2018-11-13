<template>
  <section class="task-view">
    <h3 class="content-title">요구사항 카드 상세 조회</h3>
    <template v-if="task !== null">
      <div class="task-wrap">
        <header class="task-title">
          <span :class="`color-label color${task.state + 1}`" />
          <span class="task-name" v-html="task.title" />
          <span class="reg-date">
            <i class="far fa-calendar-alt"></i>
            {{getDateFormat(task.register_date)}}
          </span>
        </header>
        <div class="task-bottom">
          <p>
            <strong class="lbl">기간</strong>
            <span v-html="getRange(task.start_date, task.limit_date)" />
          </p>
          <p>
            <strong class="lbl">남은시간</strong>
            <span v-html="getRemaining(task.limit_date)" />
          </p>
        </div>
        <div class="task-content" v-html="(task.description+'').replace(/\n/gi, '<br />')" />
        <comment />
      </div>
      <div class="btn-group">
        <router-link :to="`/project/view/${task.pidx}`" class="btn default">목록으로</router-link>
        <router-link :to="`/task/update/${task.idx}`" class="btn submit">수정하기</router-link>
        <a href="#" class="btn submit" @click="deleteTask">삭제하기</a>
        <a v-if="task.state != 1" href="#" class="btn complete" @click.prevent="setState(1)">완료</a>
        <a v-if="task.state != 2" href="#" class="btn error" @click.prevent="setState(2)">에러</a>
        <a v-if="task.state != 0" href="#" class="btn process" @click.prevent="setState(0)">진행</a>
      </div>
    </template>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    components: {
      comment: () => import(`@/components/comment/index.vue`)
    },
    created () {
      this.getTask()
    },
    data () {
      return {
        task: null,
        tidx: this.$route.params.tidx
      }
    },
    methods: {
      setState (state) {
        const tidx = this.tidx
        Api.putTaskState({state, tidx}).then(response => {
          response.data.success ? this.getTask() : console.log(response.data.err)
        })
      },
      getTask () {
        Api.getTask(this.tidx).then(response => {
          const data = response.data
          if (data.success) {
            this.task = data.task
          } else {
            console.log(data.err)
          }
        })
      },
      deleteTask () {
        Api.deleteTask(this.tidx).then(response => {
          const data = response.data
          if (data.success) {
            alert('삭제되었습니다.')
            this.$router.push('/project/view/' + this.task.pidx)
          } else {
            console.log(data.err)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .task-wrap{
    >*{background:#fff;border:1px solid #ddd;border-radius:3px;padding:15px;
      +*{margin-top:10px;}
    }
  }
  .task-title{font-size:21px;position:relative;font-weight:normal;
    .color-label:before{width:16px;height:16px;margin-top:-2px}
  }
  .reg-date{font-size:13px;display:block;color:#666;float:right;line-height:60px;position:absolute;right:15px;top:0;bottom:0;
    i{margin-top:-3px;}
  }
  .category-name{color:#aaa;display:inline-block;margin-right:5px}
  .task-content{
    >div{margin-top:15px;line-height:160%;}
  }
  .writer{
    i{margin-top:-3px;}
  }
  .task-bottom{
    p{line-height:200%;}
    .lbl{color:$color1;display:inline-block;width:80px;margin-right:10px;position:relative;
      &:after{content:"";display:inline-block;width:1px;background:#aaa;vertical-align:middle;position:absolute;right:15px;top:10px;bottom:10px;}
    }
  }
</style>