<template>
  <section>
    <header class="project-header">
      <h4 class="content-title" v-html="projectData.title" />
      <p v-html="projectData.description" />
    </header>
    <section class="project-view" v-if="typeof projectData.pidx !== 'undefined'">
      <section class="cards">
        <router-view></router-view>
      </section>
      <div class="btn-group">
        <router-link to="/project" class="btn point">프로젝트 목록</router-link>
        <router-link :to="`/project/setting/${projectData.pidx}`" class="btn point">프로젝트 설정</router-link>
        <router-link :to="`/project/view/${$route.params.pidx}/task/create`" class="btn submit">테스크 추가</router-link>
        <a href="#" class="btn submit" @click.prevent="copyToken">토큰 복사</a>
      </div>
    </section>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import layerTemplate from '@/components/layerTemplate'
  export default {
    components: {
      layerTemplate
    },
    computed: {
      projectData () { return this.$store.state.projectData }
    },
    async created () {
      const pidx = this.$route.params.pidx
      const uri = decodeURIComponent(this.$route.params.uri)
      const data = await this.getApiData(Api.getProject(pidx))
      this.$store.commit('setState', ['projectData', data.project])
      this.$store.commit('setState', ['pidx', data.project.idx])
    },
    data () {
      return {
        uri: this.$route.params.uri
      }
    },
    methods: {
      copyToken () {
        const input = document.createElement('input')
        input.type = 'text'
        input.value = this.projectData.access_token
        input.id = 'copy'
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        input.remove()
        alert('토큰이 복사되었습니다.');
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .project-view{}
  .content-title{
    &:after{margin:10px auto;}
  }
  .project-header{text-align:center;margin-bottom:20px;
    h4{font-size:25px;}
    p{font-size:17px;color:#666;}
  }
  .cards{
    header{margin-bottom:20px}
  }
  .requirement{background:#fff;border-radius:3px;border:1px solid #ddd;min-height:200px;padding:30px;}
</style>
