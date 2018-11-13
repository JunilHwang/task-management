<template>
  <section class="task-list">
    <div class="list-header float-wrap">
      <p class="cnt">{{tasks.length}}개의 task가 존재합니다.</p>
      <div class="color-description">
        <span class="color-label color1"> 
          <span>진행</span>
        </span>
        <span class="color-label color3"> 
          <span>완료</span>
        </span>
        <span class="color-label color4"> 
          <span>에러</span>
        </span>
      </div>
    </div>
    <div v-if="tasks.length">
      <ul class="float-wrap">
        <li v-for="(task, key) in tasks" :key="key">
          <dl @click.prevent="$router.push(`/task/view/${task.tidx}`)">
            <dt class="title">
              <p>
                <span :class="`color-label color${task.state + 1}`" />
                <span class="task-name" v-html="task.title" />
              </p>
            </dt>
            <dd>
              <p class="list-content" v-html="contentPreview(task.description, 200)" />
              <p class="date range">
                <span class="icon"><i class="far fa-clock"></i></span>
                <span v-html="getRange(task.start_date, task.limit_date, task.limit_time)" />
                <span class="remaining">{{getFlowProxy(task.limit_date, task.limit_time)}}</span>
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
  import Api from '@/middleware/Api.js'
  export default {
    async created () {
      Api.getTaskList(this.$route.params.pidx).then(response => {
        this.tasks = response.data.list
      })
    },
    data () {
      return {
        tasks: []
      }
    },
    methods: {
      getRange (start_date, limit_date, limit_time) {
        const start = this.moment(start_date).format('M. D HH:mm')
        const limit = this.moment(`${limit_date} ${limit_time}`).format('M. D HH:mm')
        return `${start} ~ ${limit}`
      },
      getFlowProxy (date, time) {
        const toSecond = new Date(`${date} ${time}`)
        const remaining = this.getFlowDate(toSecond)
        return parseInt(remaining) < 0 ? `${remaining.replace('-', '')} 지남` : `${remaining} 남음`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .task-list{
    li{width:33%;float:left;margin-bottom:0.5%;
      &:nth-child(3n-1){margin:0 0.5%;};
    }
    dl{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;height:100px;cursor:pointer;position:relative;}
    .none{padding:20px;}
    .title{border-bottom:1px solid #ddd;margin-bottom:10px;padding-bottom:10px;font-size:15px;}
    .category-name{color:#aaa;display:inline-block;margin-right:5px}
    .writer{display:inline-block;font-size:13px;
      i{margin-top:-4px;}
    }
    .date{font-size:11px;color:#666;margin-top:3px;
      .icon{display:inline-block;width:15px;text-align:center;margin-right:5px;}
      i{margin-top:-3px;}
    }
    .task-bottom{position:absolute;bottom:20px;left:20px;font-size:13px;
      p+p{margin-top:5px;}
      strong{color:$color1;display:inline-block;width:50px;font-weight:normal}
    }
  }
  .list-content{margin:10px 0;word-break:break-all;}
  .list-header{border-radius:3px;background:#fff;border:1px solid #ddd;padding:10px;margin-bottom:5px;}
  .cnt{float:left;}
  .color-description{float:right;
    >span+span{margin-left:10px;}
  }
  .none{background:#fff;border:1px solid #ddd;padding:10px;}
</style>