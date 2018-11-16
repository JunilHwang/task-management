<template>  
  <dl @click.prevent="$router.push(`/task/view/${task.tidx}`)">
    <dt class="title">
      <p>
        <span :class="`color-label color${task.state + 1}`" />
        <span class="task-name" v-html="task.title" />
      </p>
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
</template>

<script>
  export default {
    props: ['task']
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  dl{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;cursor:pointer;position:relative;
    &:hover{border-color:#444;}
  }
  .title{font-size:15px;}
  .date{font-size:11px;color:#666;margin-top:3px;}
  .icon{display:inline-block;width:11px;text-align:center;margin-right:5px;font-size:11px;
    i{margin-top:-3px;}
  }
  .remaining{display:inline-block;margin-left:10px;
    &.before{color:$color-google}
    &.after{color:$color-facebook}
  }
  .list-content{margin:10px 0;word-break:break-all;}
</style>