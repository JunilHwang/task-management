<template>
  <header class="header">
    <div class="container">
      <h3 class="logo"><router-link to="/project">Project Task Management</router-link></h3>
      <ul class="gnb">
        <li><router-link to="/project">프로젝트 관리</router-link></li>
        <!-- <li><router-link to="/member/mypage">마이페이지</router-link></li> -->
        <li v-if="$store.state.member"><a href="#" @click="openProjectPopup">프로젝트 생성</a></li>
        <li v-if="!$store.state.member"><a href="#" @click="openLogin">로그인</a></li>
        <li v-else><a href="#" @click="logout">로그아웃</a></li>
      </ul>
      <layerTemplate v-if="$store.state.layerState === 'loginPopup'" layerContent="login"></layerTemplate>
      <layerTemplate v-if="$store.state.layerState === 'projectPopup'" layerContent="project_create"></layerTemplate>
    </div>
  </header>
</template>
<script>
  import layerTemplate from '@/components/layerTemplate'
  export default {
    components: {
      layerTemplate
    },
    data () {
      return {}
    },
    methods: {
      openLogin () {
        this.$store.commit('openLayer', 'loginPopup')
      },
      openProjectPopup () {
        this.$store.commit('openLayer', 'projectPopup')
      },
      logout () {
        this.$store.commit('setState', ['projectList', []])
        this.$store.commit('logout')
        alert('로그아웃 되었습니다')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .header{border-bottom:1px solid #ddd;background:#fff;position:relative;z-index:20;
    .logo a{font-size:25px;color:$color1;font-weight:300;text-decoration:none}
    >div{display:flex;justify-content:space-between;align-items:center;height:60px;}
    .gnb{display:flex; 
      a{display:block;margin:0 40px;font-size:17px;font-weight:400;text-decoration:none;transition:.3s;line-height:60px;
        &:hover{color:$color1}
        &.router-link-active{position:relative;color:$color1;
          &:after{content:"";display:block;position:absolute;left:0;right:0;bottom:-1px;height:3px;background:$color1;}
        }
      }
    }
  }
</style>