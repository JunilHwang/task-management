<template>
  <header class="header">
    <div class="container">
      <h3 class="logo"><router-link to="/project">Requirements Management</router-link></h3>
      <ul class="gnb">
        <li><router-link to="/project">프로젝트 관리</router-link></li>
        <li><router-link to="/member/mypage">마이페이지</router-link></li>
        <li><a href="#" @click="logout">로그아웃</a></li>
      </ul>
    </div>
  </header>
</template>
<script>
  export default {
    methods: {
      logout () {
        this.$store.commit('logout')
        alert('로그아웃 되었습니다')
        this.$router.push('/member/login')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .header{border-bottom:1px solid #ddd;background:#fff;position:relative;z-index:10;
    .logo a{font-size:25px;color:$color1;font-weight:300;text-decoration:none}
    >div{display:flex;justify-content:space-between;align-items:center;height:100px;}
    .gnb{display:flex;
      a{display:block;padding:0 40px;font-size:17px;font-weight:400;text-decoration:none;transition:.3s;
        &:hover{color:$color1-darken-20}
      }
    }
  }
</style>