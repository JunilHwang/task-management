<template>
  <section class="task-member">
    <h3 class="layer-title">Task 담당자 관리</h3>
    <ul v-if="memberList.length">
      <li v-for="(v, k) in memberList" :key="k" :class="{active: taskMember.indexOf(v.midx) !== -1}" @click.prevent="toogleMember(v.midx)">
        <span class="image" :style="{backgroundImage: `url(${v.photo_src})`}" />
        <div class="info">
          <p class="name" v-html="v.name" />
          <p class="email" v-html="v.email" />
        </div>
      </li>
    </ul>
    <div class="btn-group btm">
      <a href="#" class="btn submit btn-full" @click.prevent="save">저장</a>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import TaskCore from '@/middleware/Task.js'
  export default {
    async created () {
      TaskCore.init(this)
      const taskMember = this.$store.state.taskMember
      const arr = []
      taskMember.forEach(v => arr.push(v.midx))
      const data = await this.getApiData(Api.getMemberOnProject(this.task.pidx))
      this.memberList = data.member
      this.taskMember = arr
    },
    data () {
      return {
        task: this.$store.state.nowTask,
        taskMember: [],
        memberList: []
      }
    },
    methods: {
      toogleMember (midx) {
        const idx = this.taskMember.indexOf(midx)
        if (idx === -1) {
          this.taskMember.push(midx)
        } else {
          this.taskMember.splice(idx, 1)
        }
        this.$forceUpdate()
      },
      async save () {
        const midx = this.taskMember.join(',')
        const tidx = this.$store.state.nowTask.tidx
        await this.getApiData(Api.postTaskMember({midx, tidx}))
        alert('완료되었습니다.')
        await TaskCore.getMember()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.task-member{width:300px;}
ul{margin-bottom:10px;}
li{border:1px solid #bebebe;border-radius:3px;padding:10px;display:flex;align-items:center;cursor:pointer;
  +li{margin-top:5px;}
  &:hover{border-color:#666;}
  &.active{border-color:$color1;}
}
.image{width:50px;height:50px;border-radius:30px;background:no-repeat center / cover;margin-right:10px;}
.info{text-align:left;}
.name{font-size:17px;}
.email{font-size:13px;color:#666;}
.btn-group{padding-top:5px;}
@include mobile () {
  .task-member{width:auto;}
}
</style>