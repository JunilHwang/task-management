<template>
  <section class="default-setting">
    <div class="setting-container">
      <header class="setting-title">
        <h3>기본 설정</h3>
        <span>Default Setting</span>
      </header>
      <form action="" method="post" @submit="projectDefaultUpdate">
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
              <button type="submit" class="btn btn-full submit">작성완료</button>
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
      projectData () {
        return this.$store.state.projectData
      }
    },
    created () {
      this.setProjectData()
    },
    methods: {
      setProjectData () {
        const _this = this

      },
      projectDefaultUpdate (e) {
        const _this = this
        const frm = e.target
        const title = frm.title.value
        const description = frm.description.value
        const idx = _this.$route.params.idx
        Api.putProject({title, description, idx}).then(() => {
          alert('수정되었습니다')
          _this.setProjectData()
        })
      }
    }
  }
</script>
