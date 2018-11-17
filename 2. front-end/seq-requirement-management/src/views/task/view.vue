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
            <a v-if="calendarConn === null" href="#" class="btn mini social-google left-margin" @click="insertCalendar">
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
          <p v-if="calendarConn !== null && calendarConn !== 1">
            <strong class="lbl">달력</strong>
            <a :href="calendarConn.html_url" class="btn mini social-naver" target="_blank">
              <i class="far fa-calendar-alt"></i>
              조회
            </a>
            <a href="#" class="btn mini social-google" @click="deleteCalendar">
              <i class="far fa-calendar-alt"></i>
              삭제
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
        commits: [],
        calendarConn: 1,
        gapiCalendar: null
      }
    },
    methods: {
      async load () {
        await TaskCore.getOne()
        await TaskCore.getCommits()
        await TaskCore.getOnCalendar()
      },
      change (link) {
        this.$router.push(link)
        this.load()
      },
      async gapiInit () {
        return this.gapiCalendar || new Promise (async resolve => {
          if (!this.$store.state.member.google_access_token.length) {
            const user = await this.$gAuth.signIn()
            const midx = this.$store.state.member.midx
            const token = user.Zi.access_token
            await this.getApiData(Api.putMemberGoogleToken({midx, token}))
            this.$store.state.member.google_access_token = token
          }
          window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init(this.getGoogleConfig())
            this.gapiCalendar = window.gapi.client.calendar
            resolve(window.gapi.client.calendar)
          })
        })
      },
      async insertCalendar () {
        const member = this.$store.state.member
        const task = this.task
        const timeZone = 'Asia/Seoul'
        const summary = `[PTM][${task.project_title}] ${task.title}`
        const description = task.description
        const email = member.email
        const startDate = this.moment(task.start_date).format()
        const limitDate = this.moment(task.limit_date).format()
        const midx = member.midx
        const tidx = task.tidx

        const params = {
          summary, description,
          start: { dateTime: startDate, timeZone },
          end: { dateTime: limitDate, timeZone },
          attendees: [ { email }, ],
        }

        const calendar = await this.gapiInit()
        calendar.events
          .insert({
            calendarId: 'primary',
            resource: params
          })
          .execute(async e => {
            if (e.status === 'confirmed') {
              const id = e.id
              const html_url = e.htmlLink
              const params = {midx, tidx, id, html_url}
              await this.getApiData(Api.postTaskOnCalendar(params))
              this.calendarConn = params
              alert('추가되었습니다.')
            }
          })
      },
      async deleteCalendar () {
        if (!confirm('정말로 삭제하시겠습니까?')) return
        const calendar = await this.gapiInit()
        calendar.events.delete({calendarId: 'primary', eventId: this.calendarConn.id}).execute(async () => {
          await this.getApiData(Api.deleteTaskOnCalendar(this.calendarConn.id))
          this.calendarConn = null
          alert('삭제 되었습니다')
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
  .task-content{line-height:160%;min-height:200px;}
  .writer{
    i{margin-top:-3px;}
  }
  .task-info{
    p{line-height:200%;}
    .lbl{color:$color1;display:inline-block;width:80px;position:relative;}
  }
  .social-naver{background:$color-naver;border-radius:3px;line-height:1;}
  .social-google{background:$color-google;border-radius:3px;line-height:1;}
  .left-margin{margin-left:10px;}
  .btn.mini{
    i{position:relative;margin-top:-2px;}
  }
</style>