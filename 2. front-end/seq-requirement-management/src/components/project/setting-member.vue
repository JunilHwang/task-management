<template>
  <section>
    <header class="setting-title">
      <h3>인원 설정</h3>
      <span>Member Setting</span>
    </header>
  </section>
</template>
<script>
  // import Api from '@/middleware/Api.js'
  export default {
    computed: {
      projectdata () {
        return this.$store.state.projectData
      }
    }
  }
</script>
<style>
  
</style>
