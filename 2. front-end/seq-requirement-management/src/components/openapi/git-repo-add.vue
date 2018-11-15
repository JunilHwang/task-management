<template>
  <div class="github-repo-add">
    <h3 class="layer-title">Repository 추가</h3>
    <ul>
      <li v-for="(repo, key) in repos" :key="key">
        <p class="full_name">
          <span class="icon-wrap"><i class="fab fa-github"></i></span>
          <span class="icon-after" v-html="repo.full_name" />
        </p>
        <p class="description">
          <span class="icon-wrap"><i class="fas fa-align-left"></i></span>
          <span class="icon-after" v-html="repo.description || '설명이 없습니다.'" />
        </p>
        <p>
          <a href="#" class="btn submit mini" @click.prevent="selectRepo(repo)">선택</a>
          <a :href="`https://github.com/${repo.full_name}`" target="_blank" class="btn point mini">조회</a>
        </p>
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
      async getRepos () {
        const url = 'https://api.github.com/user/repos'
        const token = this.$store.state.githubToken
        const response = await this.$http.get(`${url}?access_token=${token}`)
        this.repos = response.data
      },
      async selectRepo (repo) {
        const access_url = `https://api.github.com/repos/${repo.full_name}/commits`
        const full_name = repo.full_name
        const access_token = this.$store.state.githubToken
        const pidx = this.$route.params.pidx
        const description = repo.description
        const params = {pidx, access_url, full_name, access_token, description}
        const data = await this.getApiData(Api.postRepo(params))
        if (data.msg) {
          alert('이미 등록된 repository입니다.')
          return
        }
        alert('github repository가 등록되었습니다.')
        this.$store.commit('closeLayer')
        this.setRepos()
      },
      async setRepos () {
        const data = await this.getApiData(Api.getRepos(this.$route.params.pidx))
        this.$store.commit('setState', ['repos', data.repos])
      }
    }
  }  
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.github-repo-add{width:400px;margin:0 auto;}
li{display:block;border:1px solid #ddd;padding:10px;border-radius:3px;
  &:hover{border-color:#000;}
  +li{margin-top:3px;}
}
p{display:flex;align-items:center;line-height:100%;
  +p{margin-top:10px;}
  .icon-wrap{margin-right:10px;width:15px;text-align:center;}
}
.full_name{font-size:17px;}
.description{font-size:13px;color:#666;}
</style>
