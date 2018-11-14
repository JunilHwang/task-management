<template>
  <div class="project-create">
    <h3 class="layer-title">프로젝트 엑세스</h3>
    <form action="" method="post" @submit="projectAccess" @keyup="requiredCheck" name="access">
      <fieldset><legend>프로젝트 엑세스</legend>
        <ul class="fields">
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-file-signature"></i></span>
              <input type="text" name="access_token" class="full-width" required>
              <span class="lbl">엑세스 토큰 입력</span>
            </label>
          </li>
          <li v-if="required">
            <button type="submit" class="btn btn-full submit">작성완료</button>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    data () {
      return { required: false }
    },
    methods: {
      async projectAccess (e) {
        const access_token = e.target.access_token.value
        const mid = this.$store.state.member.id
        const accessData = await this.getApiData(Api.postProjectAccess({access_token, mid}))
        if (accessData.msg) {
          alert(accessData.msg)
          return
        }
        alert('프로젝트가 추가되었습니다.')
        const data = await this.getApiData(Api.getProjectListOfMain(mid))
        this.$store.commit('setState', ['projectList', data.list])
        this.$store.commit('closeLayer')
      },
      requiredCheck () {
        this.required = document.forms.access.access_token.value.length
      }
    },
    mounted () {
      document.forms.access.access_token.focus()
    }
  }  
</script>

<style lang="scss" scoped>
  .project-create{width:400px;margin:0 auto;}
</style>
