<template>
  <section>
    <h3 class="content-title">프로젝트 상세 조회</h3>
    <div class="project-view">
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    created () {
      
    },
    data () {
      return {
        projectData: []
      }
    },
    methods: {},
    mounted () {}
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
</style>
