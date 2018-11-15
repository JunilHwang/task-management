<template>
  <section class="task-view">
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
            <strong class="lbl">종료</strong>
            <span v-html="getRemaining(task.limit_date)" />
          </p>
        </div>
        <div class="task-content" v-html="(task.description+'').replace(/\n/gi, '<br />')" />
        <comment />
      </div>
      <div class="btn-group">
        <router-link :to="`/project/view/${task.pidx}`" class="btn default">목록으로</router-link>
        <a href="#" class="btn submit" @click.prevent="$store.commit('openLayer', 'taskUpdate')">수정하기</a>
        <a href="#" class="btn submit" @click.prevent="TaskCore.delete">삭제하기</a>
        <a v-if="task.state != 1" href="#" class="btn complete" @click.prevent="TaskCore.setState(1)">완료</a>
        <a v-if="task.state != 2" href="#" class="btn error" @click.prevent="TaskCore.setState(2)">에러</a>
        <a v-if="task.state != 0" href="#" class="btn process" @click.prevent="TaskCore.setState(0)">진행</a>
      </div>
    </template>
  </section>
</template>

<script>
  import TaskCore from '@/middleware/Task.js'
  export default {
    components: {
      comment: () => import(`@/components/comment/index.vue`)
    },
    created () {
      TaskCore.init(this)
      TaskCore.getOne()
    },
    computed: {
      task () {
        return this.$store.state.nowTask
      }
    },
    data () {
      return { TaskCore }
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