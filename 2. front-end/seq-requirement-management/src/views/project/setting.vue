<template>
  <section>
    <div class="setting-wrap">
      <settingDefault></settingDefault>
      <settingMember></settingMember>
      <settingOpenapi></settingOpenapi>
    </div>
    <div class="btn-group btm">
      <router-link :to="`/project/view/${projectData.writer}/${projectData.uri}`" class="btn point">설정완료</router-link>&nbsp;
    </div>
  </section>
</template>

<script>
  export default {
    components: {
      settingDefault: () => import(`@/components/project/setting-default.vue`),
      settingMember: () => import(`@/components/project/setting-member.vue`),
      settingOpenapi: () => import(`@/components/project/setting-openapi.vue`)
    },
    computed: {
      projectData () {
        return this.$store.state.projectData
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .setting-wrap{
    >section{background:#fff;border:1px solid #ddd;width:700px;margin:0 auto;padding:30px;border-radius:3px;text-align:center;
      +section{margin-top:30px;}
    }
  }
  .setting-title{text-align:left;display:inline-block;border:1px solid #aaa;border-width:1px 0;margin-bottom:15px;padding:10px;
    h3{font-weight:normal;font-size:21px;display:inline-block;vertical-align:middle;}
    span{display:inline-block;vertical-align:middle;color:#aaa;margin-left:10px;}
  }
  .setting-container{width:400px;margin:0 auto;position:relative;}
</style>