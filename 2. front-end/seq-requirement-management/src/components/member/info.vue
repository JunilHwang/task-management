<template>
  <section class="mypage">
    <div class="image" :style="{backgroundImage: `url(${member.photo_src})`}" />
    <p class="name" v-html="member.name" />
    <p class="email" v-html="member.email" />
  </section>
</template>

<script>
  export default {
    data () {
      return { member: this.$store.state.member }
    }
  }
</script>

<style lang="scss" scoped>
  .mypage{border:1px solid #ddd;border-raidus:3px;padding:15px;background:#fff;}
  .image{width:200px;height:200px;background:no-repeat center / cover;margin-bottom:5px;}
  .name{font-size:17px;margin-bottom:5px;}
  .email{font-size:13px;color:#666;}
</style>