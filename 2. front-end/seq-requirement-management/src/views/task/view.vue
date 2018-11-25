<template>
  <section class="task-view" v-if="task">
      <div class="task-wrap">
        <CustomLoading :loading="loading.task" />
        <template v-if="loading.task">
          <header class="task-title">
            <span :class="`color-label color${task.state + 1}`" />
            <span class="task-name" v-html="task.title" />
            <span class="reg-date">
              <i class="far fa-calendar-alt"></i>
              {{getDateFormat(task.register_date)}}
            </span>
          </header>
          <CustomLoading :loading="loading.calendar" />
          <div class="task-info" v-if="loading.calendar">
            <p>
              <strong class="lbl">기간</strong>
              <span v-html="getRange(task.start_date, task.limit_date)" />
              <a v-if="calendarConn === null" href="#" class="btn mini social-google left-margin" @click.prevent="insertCalendar">
                <i class="fab fa-google-plus-g"></i>
                Calendar 등록
              </a>
            </p>
            <p>
              <strong class="lbl">종료</strong>
              <span v-html="getRemaining(task.limit_date)" />
            </p>
            <p>
              <strong class="lbl">담당자</strong>
              <template v-if="taskMember.length">
                <span class="on-member" v-for="(v, k) in taskMember" :key="k">
                  <span class="image" :style="{backgroundImage: `url(${v.photo_src})`}" />
                  <span class="name" v-html="v.name" />
                </span>
              </template>
              <span v-else v-html="'담당자 없음'" />
              <a href="#" class="btn mini submit left-margin" v-html="'담당자 지정'" @click.prevent="$store.commit('openLayer', 'taskMember')" />
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
              <a href="#" class="btn mini social-google" @click.prevent="deleteCalendar">
                <i class="far fa-calendar-alt"></i>
                삭제
              </a>
            </p>
          </div>
          <div class="task-content" v-html="(task.description+'').replace(/\n/gi, '<br />')" />

          <CustomLoading :loading="loading.commits" />
          <commitList :commits="commits" v-if="loading.commits" />
        </template>

        <commentList />

      </div>
      
      <div class="btn-group mobile-btn-group">
        <router-link :to="`/project/view/${task.pidx}`" class="btn mobile-btn-full default">목록으로</router-link>
        <a href="#" class="btn mobile-btn-full submit" @click.prevent="$store.commit('openLayer', 'taskUpdate')">수정하기</a>
        <a href="#" class="btn mobile-btn-full submit" @click.prevent="TaskCore.delete">삭제하기</a>
        <a v-if="task.state != 1" href="#" class="btn mobile-btn-full complete" @click.prevent="TaskCore.setState(1)">완료</a>
        <a v-if="task.state != 2" href="#" class="btn mobile-btn-full error" @click.prevent="TaskCore.setState(2)">에러</a>
        <a v-if="task.state != 0" href="#" class="btn mobile-btn-full process" @click.prevent="TaskCore.setState(0)">진행</a>
      </div>
  </section>
</template>

<script>
  import TaskCore from '@/middleware/Task.js'
  import Api from '@/middleware/Api.js'

  export default {
    components: {
      commitList: () => import('@/components/task/commit-list.vue'),
      commentList: () => import(`@/components/comment/index.vue`),
      CustomLoading: () => import(`@/components/loading`),
    },
    created () {
      TaskCore.init(this)
      this.load()
    },
    computed: {
      task () {
        return this.$store.state.nowTask
      },
      taskMember () {
        return this.$store.state.taskMember
      }
    },
    data () {
      return {
        TaskCore,
        parent: null,
        commits: [],
        calendarConn: 1,
        gapiCalendar: null,
        loading: {
          task: false,
          commits: false,
          calendar: false
        }
      }
    },
    methods: {
      async load () {
        await TaskCore.getOne()
        this.$set(this.loading, 'task', true)
        await TaskCore.getCommits()
        this.$set(this.loading, 'commits', true)
        await TaskCore.getMember()
        await TaskCore.getOnCalendar()
        this.$set(this.loading, 'calendar', true)
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
    .color-label:before{width:16px;height:16px;margin-top:-2px;vertical-align:inherit}
  }
  .reg-date{font-size:13px;color:#666;line-height:58px;position:absolute;right:15px;top:0;bottom:0;
    i{margin-top:-3px;}
  }
  .task-content{line-height:160%;min-height:200px;}
  .writer{
    i{margin-top:-3px;}
  }
  .task-info{
    p{line-height:200%;}
    .lbl{color:$color1;display:inline-block;width:80px;position:relative;}
    .btn.mini{line-height:1;margin-top:-2px;}
  }
  .social-naver{background:$color-naver;border-radius:3px;line-height:1;}
  .social-google{background:$color-google;border-radius:3px;line-height:1;}
  .left-margin{margin-left:10px;}
  .btn.mini{
    i{position:relative;margin-top:-2px;}
  }
  .on-member{font-size:11px;border:1px solid #ddd;border-radius:3px;padding:3px;display:inline-block;line-height:16px;position:relative;top:-2px;
    >span{display:inline-block;vertical-align:middle;}
    .image{width:12px;height:12px;border-radius:12px;background:no-repeat center / cover;margin-right:3px;}
    +.on-member{margin-left:3px;}
  }
  @include tablet () {
    .task-view{padding:20px;}
    .task-wrap{
      >*{padding:10px;
        +*{margin-top:5px;}
      }
    }
  }
  @include mobile () {
    .task-view{padding:10px;}
    .task-title{font-size:17px;
      .color-label:before{width:10px;height:10px;}
    }
    .reg-date{position:static;display:block;line-height:1;margin-top:5px;}
    .task-info{font-size:12px;
      .lbl{width:40px;}
    }
  }
</style>