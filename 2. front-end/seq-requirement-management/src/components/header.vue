<template>
  <header class="header">
    <div class="container">
      <h3 class="logo"><router-link to="/">Project Task Management</router-link></h3>
      <ul class="gnb">
        <template v-if="$store.state.member">
          <li><router-link to="/">프로젝트 관리</router-link></li>
          <li><a href="#" @click.prevent="openProjectAccess">프로젝트 엑세스</a></li>
          <li><a href="#" @click.prevent="openProjectPopup">프로젝트 생성</a></li>          
          <li><a href="#" @click.prevent="logout">로그아웃</a></li>
        </template>
        <template v-else>
          <li><a href="#" @click.prevent="openLogin">로그인</a></li>          
        </template>
      </ul>
    </div>
  </header>
</template>
<script>
  export default {
    methods: {
      openLogin () {
        this.$store.commit('openLayer', 'login')
      },
      openProjectPopup () {
        this.$store.commit('openLayer', 'projectCreate')
      },
      openProjectAccess () {
        this.$store.commit('openLayer', 'projectAccess')
      },
      logout () {
        this.$store.commit('setState', ['projectList', []])
        this.$store.commit('logout')
        alert('로그아웃 되었습니다')
        this.$router.push('/')
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
      a{display:block;margin:0 20px;font-size:13px;font-weight:400;text-decoration:none;transition:.3s;line-height:60px;
        &:hover{color:$color1}
        &.router-link-active{position:relative;color:$color1;
          &:after{content:"";display:block;position:absolute;left:0;right:0;bottom:-1px;height:3px;background:$color1;}
        }
      }
    }
  }
</style>