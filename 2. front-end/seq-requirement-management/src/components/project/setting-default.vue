<template>
  <section class="default-setting">
    <div class="default-setting-wrap">
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
                <input type="text" name="subject" class="full-width" :value="projectData.subject" required>
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
                <span class="pre"><i class="fas fa-map-marker-alt"></i></span>
                <input type="text" name="uri" class="full-width" :value="projectData.uri" required>
                <span class="lbl">URI</span>
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
        Api.getProjectByIdx(_this.$route.params.idx).then(res => {
          _this.$store.commit('setState', ['projectData', res.rows[0]])
        })
      },
      projectDefaultUpdate (e) {
        const _this = this
        const frm = e.target
        const subject = frm.subject.value
        const description = frm.description.value
        const uri = frm.uri.value
        const idx = _this.$route.params.idx
        Api.putProject({subject, description, uri, idx}).then(() => {
          alert('수정되었습니다')
          _this.setProjectData()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .default-setting-wrap{width:400px;margin:0 auto;position:relative;}
</style>
