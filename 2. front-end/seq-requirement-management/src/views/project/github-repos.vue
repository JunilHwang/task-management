<template>
  <section class="project-github-repos" v-if="repos.length">
    <article v-for="(repo, key) in repos" :key="key">
      <header>
        <span class="git-icon"><i class="fab fa-github"></i></span>
        <strong class="repo-name" v-html="repo.full_name" />
        <span class="repo-desc" v-html="repo.description" />
      </header>
      <ul>
        <li v-for="(commit, key) in repo.commits" :key="key">
          <span class="image" :style="{backgroundImage: `url(${commit.image})`}" />
          <span class="author" v-html="commit.name" />
          <p class="mssage" v-html="commit.message" />
          <p class="register_date" v-html="commit.register_date" />
        </li>
      </ul>
    </article>
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
        this.repos = repos
        await repos.forEach(async (repo, key) => {
          const url = `${repo.access_url}?per_page=100&access_token=${repo.access_token}`
          const response = await this.$http.get(url)
          repo.commits = response.data
          await repo.commits.forEach((v, k) => this.getFilter(v, k, repo))
          this.$forceUpdate()
        })
      },
      getFilter (v, k, repo) {
        const name = v.author.login
        const register_date = this.moment(v.commit.author.date).format('MM-DD HH:mm')
        const image = v.author.avatar_url
        const message = v.commit.message
        repo.commits[k] = {name, image, message, register_date}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .project-github-repos{border:1px solid #ddd;border-radius:3px;margin-top:5px;background:#fff;padding:20px;}
  article{
    +article{margin-top:10px;padding-top:10px;border-top:1px dotted #ddd;}
    header{display:flex;align-items:center;line-height:100%;}
    li{background:#f5f5f5;border:1px solid #ddd;padding:10px 0;border-radius:3px;}
  }
  .git-icon{font-size:17px;margin-right:5px;}
  .repo-name{font-size:17px;font-weight:normal;margin-right:5px;}
  .repo-desc{font-size:13px;color:#666;}
</style>
