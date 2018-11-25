<template>
  <div class="project-create">
    <h3 class="layer-title">프로젝트 생성</h3>
    <form action="" method="post" @submit="projectCreate" id="projectCreate" @keyup="requiredCheck">
      <fieldset><legend>프로젝트 생성</legend>
        <ul class="fields">
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-file-signature"></i></span>
              <input type="text" name="title" class="full-width" required>
              <span class="lbl">제목</span>
            </label>
          </li>
          <li>
            <label class="input-label">
              <span class="pre"><i class="fas fa-align-left"></i></span>
              <input type="text" name="description" class="full-width" required>
              <span class="lbl">간략 설명</span>
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
      return {
        required: false
      }
    },
    methods: {
      async projectCreate (e) {
        const frm = e.target
        const writer = this.$store.state.member.id
        const params = {
          title: frm.title.value,
          description: frm.description.value,
          writer
        }
        await this.getApiData(Api.postProject(params))
        alert('프로젝트가 추가되었습니다.')
        if (window.setProjectList) window.setProjectList()
        this.$store.commit('closeLayer')
      },
      requiredCheck () {
        const frm = document.querySelector('#projectCreate')
        this.required = frm.title.value.length > 0 && frm.description.value.length > 0
      }
    },
    mounted () {
      document.querySelector('#projectCreate').title.focus()
    }
  }  
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .project-create{width:400px;margin:0 auto;}
  @include mobile () {
    .project-create{width:auto;margin:0;}
  }
</style>
