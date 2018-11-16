<template>
  <section class="project-main">
    <div class="profile">
      <memberInfo />
    </div>
    <div class="project-main-list">
      <projectMainList :projectList="projectListOnStar" type="star" />
      <projectMainList :projectList="projectList" type="default" />
      <projectTaskRecently :taskList="taskList" />
      <projectCommentRecently :commentList="commentList" />
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import memberInfo from '@/components/member/info'
  import projectMainList from '@/components/project/main-list'
  import projectTaskRecently from '@/components/project/task-list-recently'
  import projectCommentRecently from '@/components/project/comment-list-recently'
  export default {
    components: {
      memberInfo, projectMainList, projectTaskRecently, projectCommentRecently
    },
    async created () {
      this.getProjectList()
      this.getTaskRecentlyList()
      this.getCommentRecentlyList()
    },
    data () {
      return {
        taskList: [],
        commentList: [],
        projectList: [],
        projectListOnStar: [],
        mid: this.$store.state.member.id
      }
    },
    methods: {
      async getProjectList () {
        const data = await this.getApiData(Api.getProjectList(this.mid))
        const projectList = data.list
        const projectListOnStar = []
        projectList.forEach(v => {
          if (v.star !== undefined) projectListOnStar.push(v)
        })
        this.projectList = projectList
        this.projectListOnStar = projectListOnStar
      },
      async getTaskRecentlyList () {
        const data = await this.getApiData(Api.getTaskListRecently(this.mid))
        this.taskList = data.list
      },
      async getCommentRecentlyList () {
        const data = await this.getApiData(Api.getCommentRecentlyList(this.mid))
        this.commentList = data.list
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