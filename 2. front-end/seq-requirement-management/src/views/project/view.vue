<template>
  <section class="project-view-wrap">
    <header class="project-header">
      <h4 class="content-title" v-html="projectData.title" />
      <p v-html="projectData.description" />
    </header>
    <div class="btn-group tree">
      <a href="#" v-html="'Task Tree'" class="btn mobile-btn-full submit" @click="treeOpen = true" />
    </div>
    <section class="project-view" v-if="typeof projectData.pidx !== 'undefined'">
      <section class="tasks">
        <taskList :matching="matching" />
      </section>
      <projectGithubRepos />
      <customLoading :loading="loading" />
      <div class="btn-group bottom">
        <router-link to="/" class="btn mobile-btn-full point">프로젝트 목록</router-link>
        <router-link :to="`/project/setting/${projectData.pidx}`" class="btn mobile-btn-full point">프로젝트 설정</router-link>
        <a href="#" class="btn mobile-btn-full submit" @click.prevent="$store.commit('openLayer', 'taskCreate')">테스크 추가</a>
        <a href="#" class="btn mobile-btn-full submit" @click.prevent="copyToken">토큰 복사</a>
      </div>
    </section>
    <taskTree v-if="treeOpen" />
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import projectGithubRepos from './github-repos'
  import taskList from '@/components/task/list'
  import customLoading from '@/components/loading'
  import taskTree from './tree'

  export default {
    components: { projectGithubRepos, taskList, customLoading, taskTree },
    computed: {
      projectData () { return this.$store.state.projectData }
    },
    async created () {
      const pidx = this.$route.params.pidx
      const data = await this.getApiData(Api.getProject(pidx))
      this.$store.commit('setState', ['projectData', data.project])
      this.$store.commit('setState', ['pidx', data.project.idx])
    },
    data () {
      return {
        matching: {state: false, commit: null},
        loading: false, treeOpen: false
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
      },
      matchingOn (state, commit) { this.matching = {state, commit} },
      matchingOff () { this.matching = {state: false, commit: null} }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .project-view-wrap{position:relative;}
  .content-title{
    &:after{margin:10px auto;}
  }
  .project-header{text-align:center;margin-bottom:20px;
    h4{font-size:25px;}
    p{font-size:17px;color:#666;}
  }
  .tasks{
    header{margin-bottom:20px}
  }
  .requirement{background:#fff;border-radius:3px;border:1px solid #ddd;min-height:200px;padding:30px;}
  .btn-group.tree{padding:0;text-align:right;margin-top:-30px;margin-bottom:10px;}
  @include tablet () {
    .project-view-wrap{padding:20px;}
  }
  @include mobile () {
    .project-header{
      h4{font-size:17px;}
      p{font-size:13px;color:#666;}
    }
    .btn-group.bottom{padding-top:10px;}
    .btn-group.tree{margin-top:0;
      .btn{}
    }
  }
</style>
