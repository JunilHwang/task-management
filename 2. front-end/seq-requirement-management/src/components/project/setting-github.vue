<template>
  <section>
    <div class="setting-container">
      <header class="setting-title">
        <h3>Github 연동</h3>
        <span>Connect github</span>
      </header>
      <ul class="connected-list">
        <li v-for="(repo, key) in repos" :key="key">
          <a href="#" class="close" @click="deleteRepo(repo.gridx)"><i class="fas fa-times-circle"></i></a>
          <p class="full_name">
            <span class="icon-wrap"><i class="fab fa-github"></i></span>
            <span class="icon-after" v-html="repo.full_name" />
          </p>
          <p class="description">
            <span class="icon-wrap"><i class="fas fa-align-left"></i></span>
            <span class="icon-after" v-html="repo.description || '설명이 없습니다.'" />
          </p>
          <p class="register_date">
            <span class="icon-wrap"><i class="far fa-calendar-alt"></i></span>
            <span class="icon-after" v-html="moment(repo.register_date).format('MM. DD HH:mm')"></span>
          </p>
       </li>
      </ul>
      <form action="" method="post" @submit="openGitRepositoryAdd">
        <fieldset>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-file-signature"></i></span>
                <input type="text" name="github_token" class="full-width" required>
                <span class="lbl">Github Personal access tokens 입력</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">Repository 선택</button>
            </li>
            <li>
              <a href="https://github.com/settings/tokens/new" target="_blank" class="btn btn-full default">access token 생성</a>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </section>
</template>
<script>
  import Api from '@/middleware/Api.js'
  export default {
    computed: {
      repos () {
        return this.$store.state.repos
      }
    },
    created () {
      this.getRepos()
    },
    data () {
      return {
        pidx: this.$route.params.pidx
      }
    },
    methods: {
      openGitRepositoryAdd (e) {
        this.$store.commit('setState', ['githubToken', e.target.github_token.value])
        this.$store.commit('openLayer', 'githubRepository')
      },
      async getRepos () {
        const data = await this.getApiData(Api.getRepos(this.pidx))
        this.$store.commit('setState', ['repos', data.repos])
      },
      async deleteRepo (gridx) {
        if (!confirm('정말로 삭제하시겠습니까?')) return;
        await this.getApiData(Api.deleteRepo(gridx))
        this.getRepos()
      }
    },
    props: ['projectData']
  }
</script>
<style lang="scss">
.connected-list{margin-bottom:10px;
  .close{position:absolute;right:-12px;top:-12px;font-size:24px;z-index:10;opacity:0;transition:.5s;width:24px;height:24px;background:#fff;border-radius:12px;}
  li{display:block;border:1px solid #ddd;padding:10px;border-radius:3px;position:relative;
    &:hover{border-color:#000;
      .close{opacity:1;transform:inherit;}
    }
    +li{margin-top:10px;}
  }
  p{display:flex;align-items:center;line-height:100%;
    +p{margin-top:10px;}
    .icon-wrap{margin-right:10px;width:15px;text-align:center;}
  }
  .full_name{font-size:17px;}
  .description{font-size:13px;color:#444;}
  .register_date{font-size:11px;color:#777;}
}
</style>
