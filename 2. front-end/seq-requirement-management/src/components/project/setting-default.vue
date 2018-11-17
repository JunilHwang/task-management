<template>
  <section class="default-setting">
    <div class="setting-container">
      <header class="setting-title">
        <h3>기본 설정</h3>
        <span>Default Setting</span>
      </header>
      <form action="" method="post" @submit="updateProject">
        <fieldset><legend>기본 설정</legend>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-file-signature"></i></span>
                <input type="text" name="title" class="full-width" :value="projectData.title" required>
                <span class="lbl">제목</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-align-left"></i></span>
                <input type="text" name="description" class="full-width" :value="projectData.description" required>
                <span class="lbl">간략 설명</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-lock"></i></span>
                <input type="text" class="full-width" :value="projectData.access_token" readonly>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <a href="#" class="btn btn-full point" @click.prevent="copyToken">프로젝트 Token 복사</a>
            </li>
            <li>
              <a href="#" class="btn btn-full point" @click.prevent="deleteProject">프로젝트 삭제</a>
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
    data () {
      return {
        pidx: this.$route.params.pidx
      }
    },
    methods: {
      async updateProject (e) {
        const frm = e.target
        const title = frm.title.value
        const description = frm.description.value
        const pidx = this.pidx
        await this.getApiData(Api.putProject({title, description, pidx}))
        alert('수정되었습니다')
      },
      async deleteProject () {
        if (!confirm('정말로 삭제하시겠습니까?')) return
        await this.getApiData(Api.deleteProject(this.pidx))
        this.$router.push('/')
      },
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
      }
    },
    props: ['projectData']
  }
</script>
