<template>  
  <dl @click.prevent="$parent.$parent.matching.state ? $parent.matchSelect(task.tidx) : $router.push(`/task/view/${task.tidx}`)"
      :class="{active: $parent.matchList.indexOf(task.tidx) !== -1}">
    <dt class="title">
      <span :class="`color-label color${task.state + 1}`" />
      <span class="task-name" v-html="task.title" />
      <span class="comment_cnt" v-html="task.comment_cnt" />
      <p class="members" v-if="taskMember">
        <span v-for="(v, k) in taskMember" :key="k" class="images" :style="{backgroundImage: `url(${v.photo_src})`}" />
      </p>
    </dt>
    <dd v-show="folding">
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
</template>

<script>
  import TaskCore from '@/middleware/Task.js'
  export default {
    props: ['task', 'folding'],
    async created () {
      TaskCore.init(this)
      this.taskMember = await TaskCore.getMember(this.task.tidx)
    },
    data () {
      return {
        taskMember: []
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
dl{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;cursor:pointer;position:relative;
  &:hover,
  &.active{border-color:#444;}
}
.color-label{margin-top:-3px;}
.title{font-size:15px;display:flex;align-items:center;}
.comment_cnt{display:inline-block;vertical-align:middle;font-size:11px;margin-left:10px;background:#ededee;color:#586069;padding:2px 5px;line-height:1;border-radius:20px;font-weight:600;}
.date{font-size:11px;color:#666;margin-top:3px;}
.icon{display:inline-block;width:11px;text-align:center;margin-right:5px;font-size:11px;
  i{margin-top:-3px;}
}
.remaining{display:inline-block;margin-left:10px;
  &.before{color:$color-google}
  &.after{color:$color-facebook}
}
.list-content{margin:10px 0;word-break:break-all;}
.members{position:absolute;right:20px;top:20px;
  span{display:inline-block;background:no-repeat center / cover;width:15px;height:15px;border-radius:15px;vertical-align:middle;
    +span{margin-left:5px;}
  }
}
@include mobile () {
  dl{padding:10px;}
  .members{right:10px;top:10px;}
}
</style>