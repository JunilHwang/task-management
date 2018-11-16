<template>
  <section class="project-main">
    <div class="profile">
      <memberInfo />
    </div>
    <div class="project-main-list">
      <projectMainList :projectList="projectListOnStar" type="star" />
      <projectMainList :projectList="projectList" type="default" />
      <section>
        <h4 class="section-title">업데이트/생성 테스크 Top 10</h4>
        <div class="section-content">
          <template v-if="taskList.length">

          </template>
          <p class="none" v-else>이슈 목록이 없습니다.</p>
        </div>
      </section>
      <section>
        <h4 class="section-title">업데이트/생성 댓글 Top 10</h4>
        <div class="section-content">
          <template v-if="commntList.length">

          </template>
          <p class="none" v-else>구현 목록이 없습니다.</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import memberInfo from '@/components/member/info'
  import projectMainList from '@/components/project/main-list'
  export default {
    components: {
      memberInfo, projectMainList
    },
    created () { this.getProjectList() },
    data () {
      return {
        taskList: [],
        commntList: [],
        testList: [],
        projectList: [],
        projectListOnStar: [],
      }
    },
    methods: {
      async getProjectList () {
        const data = await this.getApiData(Api.getProjectListOfMain(this.$store.state.member.id))
        const projectList = data.list
        const projectListOnStar = []
        projectList.forEach(v => {
          if (v.star === 1) projectListOnStar.push(v)
        })
        this.projectList = projectList
        this.projectListOnStar = projectListOnStar
      }
    }
  }
</script>

<style lang="scss">
@import "@/assets/scss/_lib.scss";
.project-main{display:flex;justify-content:space-between;padding:0 50px;}
.profile{width:232px;}
.project-main-list{width:740px;}
.section-title{font-weight:normal;font-size:17px;margin-bottom:10px;}
.section-content{margin-bottom:20px;}
.article-title{font-size:17px;color:$color1;margin-bottom:5px;display:block;height:25px;
  a:hover{text-decoration:none;}
}
.none{background:#fff;border:1px solid #ddd;border-radius:3px;padding:10px 15px;}
</style>