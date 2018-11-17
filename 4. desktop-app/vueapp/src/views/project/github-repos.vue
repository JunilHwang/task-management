<template>
  <section class="project-github-repos" v-if="repos.length">
    <article v-for="(repo, key) in repos" :key="key">
      <header>
        <div class="title">
          <span class="git-icon"><i class="fab fa-github"></i></span>
          <strong class="repo-name" v-html="repo.full_name" />
          <span class="repo-desc" v-html="repo.description" />
        </div>
        <div class="sel">
          <a href="#" @click.prevent="showSet(key)" :class="{active: shows[key]}" v-html="shows[key] ? '접기' : '열기'" />
          <a href="#" v-for="(limit, k) in limits" :key="k" :class="{active: nowLimit[key] === limit}" v-html="`${limit}개`" @click.prevent="limitSet(key, limit)" />
        </div>
      </header>
      <ul v-if="shows[key]">
        <li v-for="(commit, key2) in repo.commits" :key="key2" v-if="key2 < nowLimit[key]"
            :class="{active: $parent.matching.state && $parent.matching.commit == commit }">
          <span class="image" :style="{backgroundImage: `url(${commit.image})`}" />
          <span class="author" v-html="commit.name" />
          <span class="message">
            <a :href="commit.html_url" v-html="commit.message" target="_blank" />
          </span>
          <span class="register_date" v-html="getFlowDate(commit.register_date)" />
          <a href="#" class="plug" @click.prevent="matchCommit(commit)"><i class="fas fa-plug"></i></a>
        </li>
        <li v-if="!repo.commits">
          등록된 commit이 없습니다.
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
        repos: [],
        nowLimit: [],
        shows: [],
        limits: [10, 30, 50, 100]
      }
    },
    methods: {
      async getRepos () {
        const data = await this.getApiData(Api.getRepos(this.$route.params.pidx))
        const repos = data.repos
        this.repos = repos
        repos.forEach(repo => {
          this.nowLimit.push(10)
          this.shows.push(false)
          const url = `${repo.access_url}?per_page=100&access_token=${repo.access_token}`
          this.$http.get(url)
            .then(response => {
              repo.commits = response.data
              repo.commits.forEach((v, k) => this.getFilter(v, k, repo)) 
              this.$forceUpdate()
            })
        })
      },
      getFilter (v, k, repo) {
        const sha = v.sha
        const name = v.commit.author.name
        const register_date = v.commit.author.date
        const image = v.author ? v.author.avatar_url : ''
        const message = v.commit.message
        const html_url = v.html_url
        repo.commits[k] = {sha, name, image, message, register_date, html_url}
      },
      matchCommit (commitData) {
        this.$parent.matchingOn(true, commitData)
      },
      limitSet (key, limit) { this.$set(this.nowLimit, key, limit) },
      showSet (key) { this.$set(this.shows, key, !this.shows[key]) }
    }
  }
</script>

<style lang="scss" scoped>
  .project-github-repos{border:1px solid #ddd;border-radius:3px;margin-top:5px;background:#fff;padding:20px;}
  article{
    +article{margin-top:20px;}
    header{line-height:100%;display:flex;justify-content:space-between;align-items:center;}
    .title{display:flex;align-items:center;}
    .sel{
      a{font-size:13px;color:#aaa;
        +a{margin-left:5px;}
        &.active{color:#000;}
      }
    }
    ul{margin-top:10px;}
    li{background:#fff;border:1px solid #ddd;padding:10px;border-radius:3px;font-size:13px;position:relative;
      +li{margin-top:3px;}
      span{display:inline-block;vertical-align:middle;}
      .plug{position:absolute;right:10px;font-size:20px;opacity:0.3;transition:0.3s;top:0;bottom:0;display:flex;align-items:center;text-decoration:none;}
      &:hover{border-color:#000;}
      &.active{border-color:#000;
        .plug{opacity:1;}
      }
    }
    .image{width:15px;height:15px;background:no-repeat center / cover;margin-right:5px;}
    .author{width:100px;}
    .register_date{float:right;color:#666;margin-right:20px;}
  }
  .git-icon{font-size:17px;margin-right:5px;}
  .repo-name{font-size:17px;font-weight:normal;margin-right:5px;}
  .repo-desc{font-size:13px;color:#666;margin-top:3px;}
</style>
