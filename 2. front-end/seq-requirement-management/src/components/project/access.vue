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
      projectCreate (e) {
        const frm = e.target
        const data = {
          writer: this.$store.state.member.id,
          title: frm.title.value,
          description: frm.description.value
        }
        Api.postProject(data).then(res => {
          if (res.data.success) {
            Api.getProjectListOfMain(this.$store.state.member.id).then(res => {
              alert('프로젝트가 추가되었습니다.')
              this.$store.commit('setState', ['projectList', res.data.list])
              this.$store.commit('closeLayer')
            })
          } else {
            throw res.data.err
          }
        })
      },
      requiredCheck () {
        const frm = document.querySelector('#projectCreate')
        this.required = frm.title.value.length > 0 && frm.description.value.length > 0
      }
    },
    mounted () {
      document.querySelector('#projectCreate').title.focus()
    },
    props: ['send'],
  }  
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .project-create{width:400px;margin:0 auto;}
  .fields{position:relative;}
  .search-wrap{border:1px solid #bebebe;
    input[type="text"]{border:none;}
  }
  .search-list{position:absolute;left:0;right:0;z-index:20;background:#fff;border:1px solid #bebebe;padding:20px;border-bottom:2px solid $color1;background:$color-grey;
    p{padding:5px 0;}
  }
  .selected-list{padding:10px;border-top:1px dotted #ddd;
    p{float:left;background:fade-out($color1, .85);border-radius:3px;font-size:11px;padding:0 7px;line-height:20px;margin-right:5px;}
    span{display:inline-block;vertical-align:middle;margin-right:5px;}
    i{margin-top:0px;color:fade-out(#000, .8)}
  }
</style>
