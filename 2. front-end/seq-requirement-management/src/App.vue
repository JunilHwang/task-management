<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created () {
      if (!this.$store.state.isMember) {
        this.$router.push('/member/login')
      } else if (this.$route.path == '/') {
        this.$router.push('/project')
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/common.scss"></style>
