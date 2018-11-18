<template>
  <section class="schedule">
    <h3 class="schedule-title">스케쥴 관리</h3>
    <div class="date-info">
      {{dateInfo.y}}-{{dateInfo.m}}-{{dateInfo.d}}
    </div>
    <div class="calendar">
      <ul class="calendar-head">
        <li v-for="(day, key) in days" :key="key" v-html="day" :class="{red: key === 0, blue: key === 6}" />
      </ul>
      <ul class="calendar-body" v-for="(i, week) in weeks" :key="week">
        <li v-for="(j, day) in 7" :key="day" :class="{now: getNum() === dateInfo.now}">
          <template v-if="emptyCheck(week, day)">
            <div class="date" :class="{red: day === 0, blue: day === 6}">
              <span v-html="getNum()" />
            </div>
            <div class="task-on-date" v-if="onCheck(getNum())">
              <a href="#" @click="openTask(v)" v-for="(v, k) in onCheck(getNum())" :class="`color${v.state + 1}`">
                [{{v.project_title}}] {{v.title}}
              </a>
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
    created () {
      this.getTaskListByRange()
    },
    data () {
      const dateInfo = {
        y: this.moment().format('YYYY'),
        m: this.moment().format('MM'),
        now: this.moment().format('DD'),
        dayNumber: 1
      }
      const first = (new Date(dateInfo.y, dateInfo.m - 1, 1)).getDay()
      const last =  (new Date(dateInfo.y, dateInfo.m, 0)).getDate()
      const weeks = Math.ceil((first + last) / 7)
      window.num = 1
      return {
        dateInfo: dateInfo,
        days: ['Sun', 'Mon', 'Tuey', 'Wed', 'Thur', 'Fri', 'Sat'],
        first, weeks, last,
        num, taskOnDate: {}
      }
    },
    methods: {
      getNum ()  {
        return this.digit(window.num)
      },
      setNum: () => {window.num++},
      emptyCheck (week, day) {
        if (week === 0 && day === 0) window.num = 1
        const firstBool = week === 0 && day <= this.first
        const lastBool = week === this.weeks - 1 && window.num > this.last
        return !(firstBool || lastBool)
      },
      onCheck (date) {
        const dateInfo = this.dateInfo
        const key = `${dateInfo.y}-${dateInfo.m}-${date}`
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
          const start_date = v.start_date.substring(0, 10)
          const limit_date = v.limit_date.substring(0, 10)

          pushOnDate(start_date, v)

          if (start_date !== limit_date) pushOnDate(limit_date, v)
        })
        this.taskOnDate = obj
      },
      openTask (task) {
        this.$store.commit('setState', ['nowTask', task])
        this.$store.commit('openLayer', 'taskMiniView')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .calendar{border:1px solid #bebebe;border-top:2px solid $color1;
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