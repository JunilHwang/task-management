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
              <span :class="`color-label color${task.state + 1}`" />
              <span class="task-name" v-html="task.title" />
              <span class="reg-date">
                <i class="far fa-calendar-alt"></i>
                {{getDateFormat(task.register_date)}}
              </span>
            </dt>
            <dd>
              <div class="list-content" v-html="contentPreview(task.description, 200)" />
              <div class="task-bottom">
                <p>
                  <strong class="lbl">기간</strong>
                  <span v-html="`${task.start_date} ~ ${task.limit_date} ${task.limit_time.slice(0, 5)}`" />
                </p>
              </div>
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
        console.log(response.data.list)
        this.tasks = response.data.list
      })
    },
    data () {
      return {
        tasks: []
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
    dl{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;height:150px;cursor:pointer;position:relative;}
    .none{padding:20px;}
    .title{border-bottom:1px solid #ddd;margin-bottom:10px;padding-bottom:10px;font-size:15px;}
    .category-name{color:#aaa;display:inline-block;margin-right:5px}
    .writer{display:inline-block;font-size:13px;
      i{margin-top:-4px;}
    }
    .reg-date{float:right;margin-left:10px;font-size:11px;color:#666;margin-top:3px;
      i{margin-top:-3px;margin-right:5px;}
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