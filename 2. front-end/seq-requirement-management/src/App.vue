<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created () {
      if (!this.$store.state.member) {
        this.$router.push('/member/login')
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/common.scss"></style>
