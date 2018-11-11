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
        <a href="#" class="btn default" @click.prevent>테스크 삭제 내역</a>
        <router-link to="/project" class="btn point">프로젝트 목록</router-link>
        <router-link :to="`/project/setting/${projectData.pidx}`" class="btn point">프로젝트 설정</router-link>
        <router-link :to="`/project/view/${$route.params.pidx}/task/create`" class="btn submit">테스크 추가</router-link>
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
    async created () {
      const pidx = this.$route.params.pidx
      const uri = decodeURIComponent(this.$route.params.uri)
      Api.getProject(pidx).then(response => {
        const projectData = response.data.project
        this.$store.commit('setState', ['projectData', projectData])
        this.$store.commit('setState', ['pidx', projectData.idx])
      })
    },
    data () {
      return {
        uri: this.$route.params.uri
      }
    },
    computed: {
      projectData () {
        return this.$store.state.projectData
      }
    },
    methods: {
      setCardList () {
        const store = this.$store
        Api.getCardList(store.state.pidx, store.state.selectedCategory).then(res => {
          store.commit('setState', ['cardList', res.rows])
        })
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
