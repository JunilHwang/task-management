<template>
  <section class="task-view" v-if="task">
    <h3 class="layer-title">Task 조회</h3>
    <header class="task-title box">
      <span :class="`color-label color${task.state + 1}`" />
      <span class="task-name" v-html="task.title" />
      <span class="reg-date">
        <i class="far fa-calendar-alt"></i>
        {{getDateFormat(task.register_date)}}
      </span>
    </header>
    <div class="task-info box">
      <p>
        <strong class="lbl">기간</strong>
        <span v-html="getRange(task.start_date, task.limit_date)" />
      </p>
      <p>
        <strong class="lbl">종료</strong>
        <span v-html="getRemaining(task.limit_date)" />
      </p>
    </div>
    <div class="task-content box" v-html="task.description.replace(/\n/gi, '<br />')" />
    
    <div class="btn-group btm mobile-btn-group btm">
      <router-link :to="`/task/view/${task.tidx}`" class="btn default mobile-btn-full" @click.native="$store.commit('closeLayer')">상세 조회</router-link>
      <a :href="task.html_url" class="btn social-google mobile-btn-full" target="_blank" v-if="task.html_url">
        <i class="far fa-calendar-alt"></i>
        구글 캘린더
      </a>
    </div>
  </section>
</template>

<script>

  export default {
    data () {
      return {
        task: this.$store.state.nowTask
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .task-view{width:500px;
    >.box{background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px;
      +.box{margin-top:5px;}
    }
  }
  .task-title{font-size:17px;position:relative;font-weight:normal;
    .color-label:before{width:10px;height:10px;margin-top:0}
  }
  .reg-date{font-size:13px;color:#666;line-height:44px;position:absolute;right:10px;top:0;bottom:0;
    i{margin-top:-2px;}
  }
  .task-content{line-height:160%;min-height:200px;}
  .writer{
    i{margin-top:-3px;}
  }
  .task-info{
    p{line-height:200%;font-size:13px;}
    .lbl{color:$color1;display:inline-block;width:50px;position:relative;}
  }
  .social-google{background:$color-google;border-radius:3px;}
  @include mobile () {
    .task-view{margin:0;width:auto;}
    .task-title{font-size:13px;}
    .reg-date{font-size:11px;line-height:1;position:static;display:block;margin-top:7px;}
  }
</style>