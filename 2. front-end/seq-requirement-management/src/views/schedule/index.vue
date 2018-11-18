<template>
  <section class="schedule">

    <header class="schedule-head">
      <h3 class="content-title">스케쥴 관리</h3>
      <div class="date-info">
        <a href="#" class="arrow change-year left" @click="setYear(+dateInfo.y - 1)"><i class="fas fa-angle-double-left"></i></a>
        <a href="#" class="arrow change-month left" @click="setMonth(+dateInfo.m - 1)"><i class="fas fa-angle-left"></i></a>
        <select class="year-select" @change="setYear($event.target.value * 1)">
          <option v-for="y in 20" :value="+dateInfo.y + y - 10" v-html="+dateInfo.y + y - 10 + ' 년'" :selected="y === 10" />
        </select>
        <select class="month-select" @change="setMonth($event.target.value * 1)">
          <option v-for="m in 12" :value="m" v-html="digit(m) + ' 월'" :selected="digit(m) === dateInfo.m" />
        </select>
        <a href="#" class="arrow change-month right" @click="setMonth(+dateInfo.m + 1)"><i class="fas fa-angle-right"></i></a>
        <a href="#" class="arrow change-year right" @click="setYear(+dateInfo.y + 1)"><i class="fas fa-angle-double-right"></i></a>
      </div>
    </header>

    <ul class="project-tab" v-if="projectList.length">
      <li :class="{active: selectedProject === null}" @click="selectedProject = null">전체</li>
      <li v-for="(project, key) in projectList"
          v-html="project.title"
          :key="key"
          :class="{active: selectedProject === project.pidx}"
          @click="selectedProject = project.pidx" />
    </ul>

    <div class="calendar">
      <ul class="calendar-head">
        <li v-for="(day, key) in days" :key="key" v-html="day" :class="{red: key === 0, blue: key === 6}" />
      </ul>
      <ul class="calendar-body" v-for="(i, week) in weeks" :key="week">
        <li v-for="(j, day) in 7" :key="day" :class="{now: now === `${dateInfo.y}${dateInfo.m}${getNum()}`}">
          <template v-if="emptyCheck(week, day)">
            <div class="date" :class="{red: day === 0, blue: day === 6}">
              <span v-html="getNum()" />
            </div>
            <div class="task-on-date" v-if="onCheck(getNum())">
              <a href="#"
                 v-for="(v, k) in onCheck(getNum())"
                 v-if="selectedProject === null || selectedProject === v.pidx"
                 v-html="`[${v.project_title}] ${v.title}`"
                 :class="`color${v.state + 1}`"
                 @click="openTask(v)" />
            </div>
            {{setNum()}}
          </template>
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'

  export default {
    async created () {
      this.projectList = (await this.getApiData(Api.getProjectList(this.$store.state.member.id))).list
      this.getTaskListByRange()
    },
    data () {
      const dateInfo = {
        y: this.moment().format('YYYY'),
        m: this.moment().format('MM')
      }
      const now = this.moment().format('YYYYMMDD')

      return {
        days: ['Sun', 'Mon', 'Tuey', 'Wed', 'Thur', 'Fri', 'Sat'],
        dateInfo, now, taskOnDate: {}, projectList: [],
        selectedProject: null
      }
    },
    computed: {
      first () { return (new Date(this.dateInfo.y, this.dateInfo.m - 1, 1)).getDay() },
      last () { return (new Date(this.dateInfo.y, this.dateInfo.m, 0)).getDate() },
      weeks () { return Math.ceil((this.first + this.last) / 7) }
    },
    methods: {
      getNum ()  {
        return this.digit(window.num)
      },
      setNum: () => {window.num++},
      emptyCheck (week, day) {
        if (week === 0 && day === 0) window.num = 1
        const firstBool = week === 0 && day < this.first
        const lastBool = week === this.weeks - 1 && window.num > this.last
        return !(firstBool || lastBool)
      },
      onCheck (date) {
        const dateInfo = this.dateInfo
        const key = dateInfo.y + dateInfo.m + date
        return this.taskOnDate[key]
      },
      async getTaskListByRange () {
        const dateInfo = this.dateInfo
        const start = this.moment(new Date(dateInfo.y, dateInfo.m - 1, 1)).format('YYYY-MM-DD 00:00:00')
        const limit = this.moment(new Date(dateInfo.y, dateInfo.m, 0)).format('YYYY-MM-DD 23:59:59')
        const mid = this.$store.state.member.id
        const midx = this.$store.state.member.midx
        const data = await this.getApiData(Api.getTaskByRange({start, limit, mid, midx}))
        const obj = {}

        const pushOnDate = (date, v) => {
          if (obj[date] === undefined)
            obj[date] = [v]
          else
            obj[date].push(v)
        }

        data.list.forEach(v => {
          const start_date = this.moment(new Date(v.start_date)).format('YYYYMMDD')
          const limit_date = this.moment(new Date(v.limit_date)).format('YYYYMMDD')

          pushOnDate(start_date, v)

          if (start_date !== limit_date) {
            const len = (limit_date * 1) - (start_date * 1)
            
            for (let i = 1; i <= len; i++) {
              pushOnDate((start_date * 1) + i, v)
            }
          }
        })
        this.taskOnDate = obj
      },
      openTask (task) {
        this.$store.commit('setState', ['nowTask', task])
        this.$store.commit('openLayer', 'taskMiniView')
      },
      setYear (y) {
        this.$set(this.dateInfo, 'y', y)
        this.getTaskListByRange()
      },
      setMonth (m) {
        m = m * 1
        let y = this.dateInfo.y * 1
        if (m < 1) {
          m = 12
          y = +y - 1
        } else if (m > 12) {
          m = 1
          y = +y + 1
        }
        this.$set(this.dateInfo, 'y', y)
        this.$set(this.dateInfo, 'm', this.digit(m))
        this.getTaskListByRange()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .schedule-head{text-align:center;}
  .content-title{font-weight:normal;font-size:23px;}
  .date-info{display:flex;justify-content:center;align-items:center;
    select{background:#fff;border-radius:0;border:1px solid #ddd;height:40px;padding:0 10px;font-size:15px;-webkit-appearance:none;border-radius:3px;
      +select{margin-left:10px;}
    }
  }
  .project-tab{display:flex;margin-top:20px;justify-content:center;
    li{border-radius:3px;background:#fff;border:1px solid #ddd;padding:5px 10px;font-size:13px;cursor:pointer;
      +li{margin-left:3px;}
      &.active{border-color:$color1;}
    }
  }
  .arrow{font-size:30px;line-height:1;color:$color1-darken-10;opacity:0.5;transition:0.3;padding:0 5px;
    &:hover{opacity:1;}
    &.change-month.left{margin-right:15px;}
    &.change-month.right{margin-left:15px;}
  }
  .calendar{border:1px solid #bebebe;border-top:2px solid $color1;margin-top:20px;
    ul{display:flex;
      &:last-child li{border-bottom:0;}
    }
    li{width:calc(100% / 7);background:#fff;border-bottom:1px dashed #bebebe;
      +li{border-left:1px dashed #bebebe;}
    }
  }
  .calendar-head{text-align:center;
    li{padding:10px 0;background:#fafafa;border-bottom:1px solid #bebebe;}
  }
  .calendar-body{
    li{min-height:150px;
      &:not(:empty):hover{background:#ffe;}
      &.now{background:#f5ffff;}
    }
  }
  .task-on-date{padding:10px;font-size:12px;
    a{display:block;background:$color-grey;border-radius:3px;border:1px solid #ddd;padding:3px;text-decoration:none;
      +a{margin-top:3px;}
      &:hover{border-color:#000;}
      &.color1{background:fade-out(#ffeb00, 0.5)}
      &.color2{background:fade-out(#a2eeef, 0.5)}
      &.color3{background:fade-out(#d73a4a, 0.5)}
    }
  }
  .date{padding:10px;border-bottom:1px dotted #ddd;}
  .red{color:#F09;}
  .blue{color:#09F;}
</style>