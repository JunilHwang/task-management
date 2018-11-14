<template>
  <div class="project-create">
    <h3 class="layer-title">Repository 추가</h3>
    <form action="" method="post" @submit="projectCreate" id="projectCreate" @keyup="requiredCheck">
      <fieldset><legend>깃허브 저장소 리스트</legend>
        <ul class="fields">
          <li>  
              <p class=""> list1 </p>   
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
        const data = await this.getApiData(Api.getProjectListOfMain(writer))
        this.$store.commit('setState', ['projectList', data.list])
        this.$store.commit('closeLayer')
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
