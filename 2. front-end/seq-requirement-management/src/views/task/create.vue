<template>
  <section>
    <div class="requirement-create">
    <h3 class="requirement-title">Task 추가</h3>
      <form action="" method="post" name="task" @submit="taskCreate" @keyup="requiredCheck" @change="requiredCheck">
        <fieldset><legend>Task 추가</legend>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-arrow-up"></i></span>
                <select name="parent" class="full-width">
                  <option value="0">상위 task 선택</option>
                  <option v-for="task in tasks" :value="task.tidx" v-html="task.title"></option>
                </select>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-file-signature"></i></span>
                <input type="text" name="title" class="full-width" required>
                <span class="lbl">제목</span>
              </label>
            </li>
            <li class="datepicker">
              <div class="input-label inline half">
                <span class="pre"><i class="far fa-calendar-alt"></i></span>
                <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableStart"
                            format="yyyy-MM-dd" @selected="setLimitDisable"
                            placeholder="시작날짜" name="start" class="full-width" required />
              </div>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="start_h" required>
                  <option value="">시간 선택</option>
                  <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'"></option>
                </select>
              </label>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="start_m" required>
                  <option value="">분 선택</option>
                  <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'"></option>
                </select>
              </label>
            </li>
            <li class="datepicker">
              <div class="input-label inline half">
                <span class="pre"><i class="far fa-calendar-alt"></i></span>
                <Datepicker :highlighted="{dates: [new Date()]}" :disabledDates="disableLimit"
                            format="yyyy-MM-dd" @selected="setStartDisable"
                            placeholder="완료날짜 선택" name="limit" class="full-width" required />
              </div>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="limit_h" required>
                  <option value="">시간 선택</option>
                  <option v-for="i in 24" :value="digit(i - 1)" v-html="digit(i - 1) + ' 시'"></option>
                </select>
              </label>
              <label class="input-label inline">
                <span class="pre"><i class="far fa-clock"></i></span>
                <select name="limit_m" required>
                  <option value="">분 선택</option>
                  <option v-for="i in 60" :value="digit(i - 1)" v-html="digit(i - 1) + ' 분'"></option>
                </select>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-align-left"></i></span>
                <textarea type="text" name="description" class="full-width" cols="80" rows="10" required></textarea>
                <span class="lbl">간략 설명</span>
              </label>
            </li>
            <li v-if="required">
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <router-link :to="`/project/view/${$route.params.pidx}`" type="submit" class="btn btn-full default">목록으로</router-link>
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
      const taskList = await this.getApiData(Api.getTaskList(this.$route.params.pidx))
      this.$store.commit('setState', ['taskList', taskList])
    },
    data () {
      return {
        required: false,
        tasks: [],
        disableStart: {to: this.getSubDay(), from: null},
        disableLimit: {to: this.getSubDay()},
      }
    },
    methods: {
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
      async taskCreate (e) {
        const frm = e.target
        const title = frm.title.value,
              parent = frm.parent.value,
              start_date = `${frm.start.value} ${frm.start_h.value}:${frm.start_m.value}:00`,
              limit_date = `${frm.limit.value} ${frm.limit_h.value}:${frm.limit_m.value}:00`,
              description = frm.description.value,
              pidx = this.$route.params.pidx
        const params = {pidx, parent, title, start_date, limit_date, description}
        await this.getApiData(Api.postTask(params))
        alert('완료되었습니다.')
        this.$router.push('/project/view/' + pidx)
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