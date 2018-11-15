<template>
  <div class="project-create">
    <h3 class="layer-title">Repository 추가</h3>
    <ul class="fields">
      <li v-for="(repo, key) in repos" :key="key">
       <a href="#" @click.prevent="selectRepo(repo)">{{repo.full_name}}</a>
     </li>
   </ul>
 </div>
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
      getRepos () {
        const url = 'https://api.github.com/user/repos'
        const token = this.$store.state.githubToken
        this.$http.get(`${url}?access_token=${token}`).then(response => {
          this.repos = response.data
        })
      },
      async selectRepo (repo) {
        const access_url = `https://api.github.com/repos/${repo.full_name}/commits`
        const full_name = repo.full_name
        const access_token = this.$store.state.githubToken
        const pidx = this.$route.params.pidx
        const params = {pidx, access_url, full_name, access_token}
        const data = await this.getApiData(Api.postRepo(params))
        if (data.msg) {
          alert('이미 등록된 repository입니다.')
          return
        }
        alert('github repository가 등록되었습니다.')
        this.$store.commit('closeLayer')
      }
    }
  }  
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.project-create{width:400px;margin:0 auto;}
a{display:block;border:1px solid #ddd; padding: 3px 15px;text-decoration: none}
a:hover { border:1px solid #000;}
</style>
