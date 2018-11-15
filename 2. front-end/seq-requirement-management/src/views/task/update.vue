<template>
  <section>
    <div class="requirement-create">
    <h3 class="requirement-title">Task 수정</h3>
      <form action="" method="post" name="task" @submit="taskUpdate" @keyup="requiredCheck" @change="requiredCheck">
        <fieldset><legend>Task 수정</legend>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-arrow-up"></i></span>
                <select name="parent" class="full-width">
                  <option value="0">상위 task 선택</option>
                  <option v-for="t in tasks" v-if="t.tidx !== task.tidx" :value="t.tidx" v-html="t.title" :selected="t.tidx === task.parent"></option>
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
              <div class="input-label inline half">
                <span class="pre"><i class="far fa-calendar-alt"></i></span>
                <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableStart"
                            format="yyyy-MM-dd" @selected="setLimitDisable" :value="start"
                            placeholder="시작날짜" name="start" class="full-width" required />
              </div>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="start_h" required>
                  <option value="">시간 선택</option>
                  <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'" :selected="digit(i - 1) === start_h"></option>
                </select>
              </label>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="start_m" required>
                  <option value="">분 선택</option>
                  <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'" :selected="digit(i - 1) === start_m"></option>
                </select>
              </label>
            </li>
            <li class="datepicker">
              <div class="input-label inline half">
                <span class="pre"><i class="far fa-calendar-alt"></i></span>
                <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableLimit"
                            format="yyyy-MM-dd" @selected="setStartDisable" :value="limit"
                            placeholder="완료날짜 선택" name="limit" class="full-width" required />
              </div>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="limit_h" required>
                  <option value="">시간 선택</option>
                  <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'" :selected="digit(i - 1) === limit_h"></option>
                </select>
              </label>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="limit_m" required>
                  <option value="">분 선택</option>
                  <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'" :selected="digit(i - 1) === limit_m"></option>
                </select>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-align-left"></i></span>
                <textarea type="text" name="description" class="full-width" cols="80" rows="10" required v-html="task.description"></textarea>
                <span class="lbl">간략 설명</span>
              </label>
            </li>
            <li v-if="required">
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <router-link :to="`/task/view/${task.tidx}`" class="btn btn-full default">목록으로</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import Datepicker from 'vuejs-datepicker';
  export default {
    components: {
      Datepicker
    },
    async created () {
      this.getTasks()
      this.getNowTask()
    },
    data () {
      return {
        tidx: this.$route.params.tidx,
        pidx: this.$route.params.pidx,
        required: true,
        task: {},
        tasks: [],
        disableStart: {to: this.getSubDay(), from: null},
        disableLimit: {to: this.getSubDay()},
        start: null,
        start_h: null,
        start_m: null,
        limit: null,
        limit_h: null,
        limit_m: null
      }
    },
    methods: {
      async getTasks () {
        const data = await this.getApiData(Api.getTaskList(this.pidx))
        this.tasks = data.list
      },
      async getNowTask () {
        const data = await this.getApiData(Api.getTask(this.tidx))
        const task = data.task
        const start_date = this.moment(task.start_date)
        const limit_date = this.moment(task.limit_date)
        this.start = start_date.format("YYYY-MM-DD")
        this.start_h = start_date.format("HH")
        this.start_m = start_date.format("mm")
        this.limit = limit_date.format("YYYY-MM-DD")
        this.limit_h = limit_date.format("HH")
        this.limit_m = limit_date.format("mm")
        this.task = data.task
        this.setStartDisable(new Date(limit_date.format()))
        this.setLimitDisable(new Date(start_date.format()))
      },
      getSubDay (date = new Date()) {
        return new Date(this.moment(date).subtract(1, 'days').format())
      },
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
      async taskUpdate (e) {
        const frm = e.target
        const title = frm.title.value,
              start_date = `${frm.start.value} ${frm.start_h.value}:${frm.start_m.value}:00`,
              limit_date = `${frm.limit.value} ${frm.limit_h.value}:${frm.limit_m.value}:00`,
              description = frm.description.value,
              tidx = this.tidx
        const params = {tidx, title, start_date, limit_date, description}
        await this.getApiData(Api.putTask(params))
        alert('완료되었습니다.')
        this.$router.push('/task/view/' + tidx)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .requirement-create{width:700px;margin:0 auto;background:#fff;padding:30px;border:1px solid #ddd;border-radius:3px;}
  .full-width input{width:100% !important}
  .input-label.inline{display:inline-block;margin-right:5px;
    select{width:200px;}
  }
</style>