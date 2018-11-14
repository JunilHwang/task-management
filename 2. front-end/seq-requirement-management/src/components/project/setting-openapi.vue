<template>
  <section>
    <div class="setting-container">
    <h3 class="setting-title">Github API 연동</h3>
    <form action="" method="post" @submit="">
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
            <button type="submit" class="btn btn-full submit" @click.button="openGitRepositoryAdd">Repository 선택</button>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
  </section>
</template>
<script>
  // import Api from '@/middleware/Api.js'
  export default {
    computed: {
      projectdata () {
        return this.$store.state.projectData
      }
    },
    methods: {
      openGitRepositoryAdd() {
        this.$store.commit('openLayer', 'github_repository')
      }
    }
  }
</script>
<style>

</style>
