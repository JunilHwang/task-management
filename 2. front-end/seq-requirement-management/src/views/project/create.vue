<template>
  <section class="project-main">
    <h3 class="content-title">프로젝트 관리</h3>
    <div class="float-wrap">
      <section class="project-section">
        <h4 class="section-title">참여 프로젝트 목록</h4>
      </section>
      <section class="project-section">
        <h4 class="section-title">이슈 목록</h4>
      </section>
      <section class="project-section">
        <h4 class="section-title">구현 목록</h4>
      </section>
      <section class="project-section">
        <h4 class="section-title">테스팅 목록</h4>
      </section>
    </div>
    <div class="btn-group right">
      <router-link to="/project/create" class="btn submit">프로젝트 생성</router-link>
    </div>
  </section>
</template>

<script>
  export default {}
</script>

<style>
  .project-section{float:left;width:calc(50% - 72px);border:1px solid #ddd;margin:15px;padding:20px;border-radius:3px;}
  .section-title{font-weight:normal;font-size:17px;}
</style>