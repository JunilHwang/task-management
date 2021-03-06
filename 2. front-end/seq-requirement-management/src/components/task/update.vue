<template>
  <div class="requirement-create">
    <h3 class="requirement-title">Task 수정</h3>
    <CustomLoading :loading="loading" />
    <form v-if="loading" action="" method="post" name="task" @submit="TaskCore.update" @keyup="requiredCheck" @change="requiredCheck">
      <fieldset><legend>Task 수정</legend>
        <ul class="fields">
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-arrow-up"></i></span>
              <select name="parent" class="full-width">
                <option value="0">상위 task 선택</option>
                <option v-for="(t, optionKey) in tasks" v-if="t.tidx !== task.tidx" :value="t.tidx" v-html="t.title" :selected="t.tidx === task.parent" :key="optionKey" />
              </select>
            </label>
          </li>
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-file-signature"></i></span>
              <input type="text" name="title" class="full-width" :value="task.title" required>
              <span class="lbl">제목</span>
            </label>
          </li>
          <li class="datepicker">
            <div class="input-label inline half calendar">
              <span class="pre"><i class="far fa-calendar-alt"></i></span>
              <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableStart"
                          format="yyyy-MM-dd" @selected="setLimitDisable" :value="start"
                          placeholder="시작날짜" name="start" class="full-width" required />
            </div>
            <label class="input-label inline label">
              <span class="pre"><i class="far fa-clock"></i></span>
              <select name="start_h" required>
                <option value="">시간 선택</option>
                <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'" :selected="digit(i - 1) === start_h" :key="i" />
              </select>
            </label>
            <label class="input-label inline label">
              <span class="pre"><i class="far fa-clock"></i></span>
              <select name="start_m" required>
                <option value="">분 선택</option>
                <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'" :selected="digit(i - 1) === start_m" :key="i" />
              </select>
            </label>
          </li>
          <li class="datepicker">
            <div class="input-label inline half calendar">
              <span class="pre"><i class="far fa-calendar-alt"></i></span>
              <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableLimit"
                          format="yyyy-MM-dd" @selected="setStartDisable" :value="limit"
                          placeholder="완료날짜 선택" name="limit" class="full-width" required />
            </div>
            <label class="input-label inline label">
              <span class="pre"><i class="far fa-clock"></i></span>
              <select name="limit_h" required>
                <option value="">시간 선택</option>
                <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'" :selected="digit(i - 1) === limit_h" :key="i" />
              </select>
            </label>
            <label class="input-label inline label">
              <span class="pre"><i class="far fa-clock"></i></span>
              <select name="limit_m" required>
                <option value="">분 선택</option>
                <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'" :selected="digit(i - 1) === limit_m" :key="i" />
              </select>
            </label>
          </li>
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-align-left"></i></span>
              <textarea type="text" name="description" class="full-width" cols="80" rows="10" required v-html="task.description" />
              <span class="lbl">간략 설명</span>
            </label>
          </li>
          <li v-if="required">
            <button type="submit" class="btn btn-full submit">작성완료</button>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import TaskCore from '@/middleware/Task.js'
  import Datepicker from 'vuejs-datepicker'
  import CustomLoading from '@/components/loading'

  export default {
    components: { Datepicker, CustomLoading },
    async created () {
      TaskCore.init(this)
      this.task = this.$store.state.nowTask
      await TaskCore.getList(this.task.pidx)
      this.getNow()
      this.loading = true
      await TaskCore.getOnCalendar()
    },
    computed: {
      tasks () { return this.$store.state.taskList }
    },
    data () {
      const [tidx, required, task, start, start_h, start_m, limit, limit_h, limit_m, calendarConn] = [null, true, {}, null, null, null, null, null, null, null]
      return {
        TaskCore, tidx, required, task, start, start_h, start_m, limit, limit_h, limit_m, calendarConn,
        disableStart: {to: this.getSubDay(), from: null},
        disableLimit: {to: this.getSubDay()},
        loading: false
      }
    },
    methods: {
      getSubDay (date = new Date()) { return new Date(this.moment(date).subtract(1, 'days').format()) },
      setStartDisable (selectDate) { this.disableStart.from = selectDate },
      setLimitDisable (selectDate) { this.disableLimit.to = selectDate },
      requiredCheck () {
        const frm = document.forms.task
        const title = frm.title.value.length > 0,
              start = frm.start.value.length > 0,
              start_h = frm.start_h.value.length > 0,
              start_m = frm.start_m.value.length > 0,
              limit = frm.limit.value.length > 0,
              limit_h = frm.limit_h.value.length > 0,
              limit_m = frm.limit_m.value.length > 0,
              description = frm.description.value.length > 0
        this.required = title && start && start_h && start_m && limit && limit_h && limit_m && description
      },
      getNow () {
        const task = this.task
        const start_date = this.moment(task.start_date)
        const limit_date = this.moment(task.limit_date)
        this.tidx = this.task.tidx
        this.start = start_date.format("YYYY-MM-DD")
        this.start_h = start_date.format("HH")
        this.start_m = start_date.format("mm")
        this.limit = limit_date.format("YYYY-MM-DD")
        this.limit_h = limit_date.format("HH")
        this.limit_m = limit_date.format("mm")
        this.setStartDisable(new Date(limit_date.format()))
        this.setLimitDisable(new Date(start_date.format()))
      },
      async updateCalendar (updatedTask) {
        const member = this.$store.state.member
        const timeZone = 'Asia/Seoul'
        const summary = `[PTM][${this.task.project_title}] ${updatedTask.title}`
        const description = updatedTask.description
        const email = member.email
        const startDate = this.moment(updatedTask.start_date).format()
        const limitDate = this.moment(updatedTask.limit_date).format()
        const calendarId = 'primary'
        const eventId = this.calendarConn.id

        const resource = {
          summary, description,
          start: { dateTime: startDate, timeZone },
          end: { dateTime: limitDate, timeZone },
          attendees: [ { email }, ],
        }

        const calendar = await this.gapiInit()
        calendar.events.update({calendarId, eventId, resource}).execute(e => {
          if (e.status !== 'confirmed') throw e
        })
      },
      async gapiInit () {
        return new Promise (resolve => {
          window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init(this.getGoogleConfig())
            this.gapiCalendar = window.gapi.client.calendar
            resolve(window.gapi.client.calendar)
          })          
        })
      },
    }
  }
</script>