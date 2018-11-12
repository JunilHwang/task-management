<template>
  <div class="login">
      <h3 class="layer-title">사이트 로그인</h3>
      <ul class="social-buttons">
        <li>
          <button type="button" class="btn btn-social-google full-width" @click="signInByGoogle">
            <span class="btn-icon"><i class="fab fa-google"></i></span>
            Login with Google
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-social-naver full-width">
            <span class="btn-icon"><img src="@/assets/naver-icon.png" alt="n" height="16"></span>
            Login with Naver
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-social-facebook full-width">
            <span class="btn-icon"><i class="fab fa-facebook-f"></i></span>
            Login with Facebook
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-social-kakao full-width">
            <span class="btn-icon"><i class="fas fa-comment"></i></span>
            Login with Kakao
          </button>
        </li>
      </ul>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    props: ['send'],
    methods: {
      signInByGoogle () {
        this.$gAuth.signIn()
        .then(user => {
          const member = {
            type: 'google',
            access_token: user.Zi.access_token,
            id: user.El,
            name: user.w3.ig,
            email: user.w3.U3,
            photo_src: user.w3.Paa
          }
          this.$store.commit('loggedIn', member)
          this.$store.commit('closeLayer')
          Api.postMember(member).then(response => {
            console.log(response.data)
          })
        })
        .catch(error  => {
          throw error
        })
      },
    }
  }  
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .login{width:250px;}
  .social-buttons li+li{margin-top:5px;}
  .btn{text-shadow:none;border-radius:3px;text-align:left;height:40px;
    i{font-size:18px;}
  }
  .btn-icon{margin-top:-2px;width:60px;display:inline-block;text-align:center;}
  .btn-social-google{background:$color-google;}
  .btn-social-naver{background:$color-naver;}
  .btn-social-facebook{background:$color-facebook;}
  .btn-social-kakao{background:$color-kakao;color:#3c1e1e;}
</style>
