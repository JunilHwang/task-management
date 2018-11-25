<template>
  <header class="header">
    <div class="container">
      <h3 class="logo"><router-link to="/">Project Task Management</router-link></h3>
      <ul class="gnb" v-if="member">
          <li><router-link to="/project">프로젝트 관리</router-link></li>
          <li><router-link to="/schedule">스케쥴 관리</router-link></li>
          <li><a href="#" @click.prevent="openProjectAccess">프로젝트 엑세스</a></li>
          <li><a href="#" @click.prevent="openProjectPopup">프로젝트 생성</a></li>   
          <li><a href="#" @click.prevent="logout">로그아웃</a></li>
      </ul>
      <div class="gnb-mobile only-mobile" v-if="member">
        <div class="profile">
          <span class="image" :style="{backgroundImage: `url(${member.photo_src})`}" />
          <p class="name" v-html="member.name" />
          <p class="email" v-html="member.email" />
        </div>
        <div class="nav">
          <router-link to="/project"><i class="fas fa-home"></i></router-link>
          <a href="#" @click.prevent="openProjectAccess"><i class="fas fa-link"></i></a>
          <router-link to="/schedule"><i class="fas fa-calendar-alt"></i></router-link>
          <a href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i></a>
          <a href="#" @click.prevent="openProjectPopup" class="mobile-project-add"><i class="fas fa-plus"></i></a>
        </div>
      </div>
      <div class="mobile-logo" v-else="!member">
        Project Task Manager
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    computed: {
      member () {
        return this.$store.state.member
      }
    },
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

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .header{border-bottom:1px solid #ddd;background:#fff;position:relative;z-index:20;
    a{text-decoration:none;}
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
    @include tablet () {position:fixed;left:0;right:0;top:0;z-index:30;background:fade-out(#fff, 0.15);
      +*{padding-top:50px;}
      >div{display:block;height:auto;}
      .logo{display:none;}
      .gnb{display:flex;justify-content:center;
        >li{width:20%;}
        a{margin:0;line-height:50px;text-align:center;}
      }
    }
    @include mobile () {
      +*{padding-top:50px;}
      .gnb{display:none;}
    }
    .gnb-mobile{height:50px;margin:0 10px;}
    .profile{
      .image{float:left;width:30px;height:30px;margin:10px 10px 10px 0;border-radius:30px;background:no-repeat center / cover;}
      .name{font-size:12px;padding-top:9px;}
      .email{font-size:11px;color:#666;}
    }
    .nav{position:absolute;right:10px;top:0;bottom:1px;display:flex;align-items:center;font-size:20px;
      a{
        &.router-link-active{color:$color1;}
        +a{margin-left:15px;}
      }
    }
    .mobile-logo{text-align:center;line-height:50px;color:$color1;font-size:21px;}
    .mobile-project-add{@include cycle(30px, $color1-darken-10, #fff);position:fixed;right:10px;bottom:10px;font-size:20px;display:flex;justify-content:center;align-items:center;text-align:center;box-shadow:0 0 5px #666;}
  }

</style>