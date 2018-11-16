<template>
  <section class="member-wrap">
    <div class="cols">
      <memberInfo />
    </div>
  </section>
</template>

<script>
  import memberInfo from './info'
  export default {
    components: {
      memberInfo
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss"></style>
