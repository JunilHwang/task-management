<template>
  <section>
    <div class="setting-wrap" v-if="projectData">
      <settingDefault :projectData="projectData" />
      <settingMember :projectData="projectData" />
      <settingGithub :projectData="projectData" />
    </div>
    <div class="btn-group btm" v-if="projectData">
      <router-link :to="`/project/view/${projectData.pidx}`" class="btn point">설정완료</router-link>&nbsp;
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    components: {
      settingDefault: () => import(`@/components/project/setting-default`),
      settingMember: () => import(`@/components/project/setting-member`),
      settingGithub: () => import(`@/components/project/setting-github`)
    },
    data () {
      return {
        pidx: this.$route.params.pidx,
        projectData: null
      }
    },
    async created () {
      const data = await this.getApiData(Api.getProject(this.pidx))
      this.projectData = data.project
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .setting-wrap{
    >section{background:#fff;border:1px solid #ddd;width:700px;margin:0 auto;padding:30px;border-radius:3px;text-align:center;
      +section{margin-top:10px;}
    }
  }
  .setting-title{text-align:left;display:inline-block;border:1px solid #aaa;border-width:1px 0;margin-bottom:15px;padding:10px;
    h3{font-weight:normal;font-size:21px;display:inline-block;vertical-align:middle;}
    span{display:inline-block;vertical-align:middle;color:#aaa;margin-left:10px;}
  }
  .setting-container{width:400px;margin:0 auto;position:relative;}
</style>