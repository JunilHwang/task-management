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
        <div class="task-info">
          <p>
            <strong class="lbl">기간</strong>
            <span v-html="getRange(task.start_date, task.limit_date)" />
            <a href="#" class="btn mini social-google" @click="googleCalendarAdd">
              <i class="fab fa-google-plus-g"></i>
              Calendar 등록
            </a>
          </p>
          <p>
            <strong class="lbl">종료</strong>
            <span v-html="getRemaining(task.limit_date)" />
          </p>
          <p>
            <strong class="lbl">선행</strong>
            <span v-if="parent === null">없습니다.</span>
            <a v-else href="#" @click.prevent="change(`/task/view/${parent.tidx}`)">
              <span :class="`color-label color${parent.state + 1}`" />
              {{parent.title}} / 
              {{contentPreview(parent.description, 40)}}
            </a>
          </p>
        </div>
        <div class="task-content" v-html="(task.description+'').replace(/\n/gi, '<br />')" />
        <commitList :commits="commits" />
        <commentList />
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
  import Api from '@/middleware/Api.js'

  export default {
    components: {
      commitList: () => import('@/components/task/commit-list.vue'),
      commentList: () => import(`@/components/comment/index.vue`)
    },
    created () {
      TaskCore.init(this)
      this.load()
    },
    computed: {
      task () {
        return this.$store.state.nowTask
      }
    },
    data () {
      return {
        TaskCore,
        parent: null,
        commits: []
      }
    },
    methods: {
      async load () {
        const task = await TaskCore.getOne()
        this.parent = task.parent ? await TaskCore.getOne(task.parent) : null
        const data = await this.getApiData(Api.getCommits(task.tidx))
        this.commits = data.commits
        this.gapiInit()
      },
      change (link) {
        this.$router.push(link)
        this.load()
      },
      async googleCalendarAdd () {
      },
      async gapiInit () {
        if (!this.$store.state.member.google_access_token.length) {
          const user = await this.$gAuth.signIn()
          const midx = this.$store.state.member.midx
          const token = user.Zi.access_token
          await this.getApiData(Api.putMemberGoogleToken({midx, token}))
          this.$store.state.member.google_access_token = token
        }
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
  .task-content{line-height:160%;min-height:200px;}
  .writer{
    i{margin-top:-3px;}
  }
  .task-info{
    p{line-height:200%;}
    .lbl{color:$color1;display:inline-block;width:80px;position:relative;}
  }
  .social-google{background:$color-google;border-radius:3px;margin-left:10px;line-height:1;}
</style>