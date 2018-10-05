<template>
  <section>
    <h3 class="content-title">프로젝트 설정</h3>
    <div class="setting-wrap">
      <settingDefault projectData="projectData"></settingDefault>
      <settingMember projectData="projectData"></settingMember>
      <settingOpenapi projectData="projectData"></settingOpenapi>
    </div>
    <div class="btn-group btm">
      <a href="#" class="btn point" @click.prevent="$router.go(-1)">설정완료</a>&nbsp;
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    components: {
      settingDefault: () => import(`@/components/project/setting-default.vue`),
      settingMember: () => import(`@/components/project/setting-member.vue`),
      settingOpenapi: () => import(`@/components/project/setting-openapi.vue`)
    },
    computed: {
      projectdata () {
        return this.$store.state.projectData
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .setting-wrap{background:#f5f5f5;border:1px solid #ddd;padding:50px;border-radius:3px;
    >section{background:#fff;border:1px solid #ddd;padding:30px;border-radius:3px;
      +section{margin-top:30px;}
    }
  }
  .setting-title{font-weight:normal;
    &:before{content:"";display:inline-block;margin-right:5px;margin-top:-3px;vertical-align:middle;height:13px;width:3px;background:$color1}
  }
</style>