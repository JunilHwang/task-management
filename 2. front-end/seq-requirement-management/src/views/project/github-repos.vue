<template>
  <section class="project-github-repos" v-if="repos.length">
    
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    created () {
      this.getRepos()
    },
    data () {
      return {
        repos: []
      }
    },
    methods: {
      async getRepos () {
        const data = await this.getApiData(Api.getRepos(this.$route.params.pidx))
        const repos = data.repos
        repos.map(async repo => {
          const url = `${repo.access_url}?access_token=${repo.access_token}`
          const response = await this.$http.get(url)
          console.log(response)
        })
        this.repos = repos
      }
    }
  }
</script>

<style lang="scss" scoped>
  .project-github-repos{border:1px solid #ddd;border-radius:3px;margin-top:5px;background:#fff;padding:20px;}
</style>