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
