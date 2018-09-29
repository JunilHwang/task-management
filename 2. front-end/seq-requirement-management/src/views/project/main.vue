<template>
  <section class="project-main">
    <h3 class="content-title">프로젝트 관리</h3>
    <div class="float-wrap">
      <section class="project-section">
        <h4 class="section-title">참여 프로젝트 목록</h4>
        <template v-if="projectList.length">
          
        </template>
        <p v-else>참여 참여 목록이 없습니다.</p>
      </section>
      <section class="project-section">
        <h4 class="section-title">이슈 목록</h4>
        <template v-if="issueList.length">
          
        </template>
        <p v-else>이슈 목록이 없습니다.</p>
      </section>
      <section class="project-section">
        <h4 class="section-title">구현 목록</h4>
        <template v-if="implementList.length">
          
        </template>
        <p v-else>구현 목록이 없습니다.</p>
      </section>
      <section class="project-section">
        <h4 class="section-title">테스팅 목록</h4>
        <template v-if="testList.length">
          
        </template>
        <p v-else>테스팅 목록이 없습니다.</p>
      </section>
    </div>
    <div class="btn-group right">
      <router-link to="/project/create" class="btn submit">프로젝트 생성</router-link>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    data () {
      return {
        projectList: [],
        issueList: [],
        implementList: [],
        testList: []
      }
    },
    async created () {
      this.projectList = await Api.getProjectListOfMain()
    }
  }
</script>

<style>
  .project-section{border:1px solid #ddd;margin:15px;padding:20px;border-radius:3px;}
  .section-title{font-weight:normal;font-size:21px;margin-bottom:15px;}
</style>