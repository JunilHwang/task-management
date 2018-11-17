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
        <a href="#" id="btn-naver-custom" @click.prevent="centerPopupOpen" class="btn btn-social-naver full-width">
          <span class="btn-icon"><img src="@/assets/naver-icon.png" alt="n" height="16"></span>
          Login with Naver
        </a>
      </li>
      <li>
        <button type="button" class="btn btn-social-facebook full-width">
          <span class="btn-icon"><i class="fab fa-facebook-f"></i></span>
          Login with Facebook
        </button>
      </li>
      <li>
        <a href="#" class="btn btn-social-kakao full-width" @click.prevent="loginWithKakao">
          <span class="btn-icon"><i class="fas fa-comment"></i></span>
          Login with Kakao
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    props: ['send'],
    created () {
      this.naverInit()
      this.kakaoInit()
    },
    data () {
      return {
        Kakao: null
      }
    },
    methods: {
      naverInit () {
        const $s = require('scriptjs')
        $s('/js/naver.sdk.js', () => {
          const naverLogin = new naver.LoginWithNaverId({
            clientId: "onePygBsyBG0fbTiQKSI",
            callbackUrl: "http://localhost:8080/naver/oauth",
            isPopup: true
            //loginButton: {color: "green", type: 3, height: 60}
          })
          /* (4) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
          naverLogin.init();

          const sel = ele => document.querySelector(ele)
          const loginBtn = sel('#btn-naver-custom')
          
          /* (4-1) 임의의 링크를 설정해줄 필요가 있는 경우 */
          loginBtn.href = naverLogin.generateAuthorizeUrl()
        })
      },
      kakaoInit () {
        const $s = require('scriptjs')
        $s('/js/kakao.sdk.js', () => {
          this.Kakao = Kakao
          Kakao.init('6304630a23985088f334f209161baec1')
        })
      },
      loginWithKakao () {
        // 로그인 창을 띄웁니다.
        const $http = this.$http
        console.log(this.Kakao)
        this.Kakao.Auth.login({
          success (authObj) {
            const access_token = authObj.access_token
            const url = 'https://kapi.kakao.com/v2/user/me'
            $http({
              method: 'get',
              url,
              header: {
                authorization: `Bearer ${access_token}`,
                contentType: 'application/x-www-form-urlencoded;charset=utf-8'
              }
            }).then(response => {
              console.log(response)
            })
          },
          fail (err) {
            alert(JSON.stringify(err))
          }
        });
      },
      centerPopupOpen (e) {
        const url = e.target.href
        
        const dualScreenLeft = window.screenLeft || window.screenX;
        const dualScreenTop = window.screenTop || window.screenY;

        const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
        const height = window.innerHeight || document.documentElement.clientHeight || screen.height;

        const w = 600, h = 600
        const left = ((width / 2) - (w / 2)) + dualScreenLeft;
        const top = ((height / 2) - (h / 2)) + dualScreenTop;

        window.open(url, 'login popup', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`)
      },
      async signInByGoogle () {
        // google 에서 user 정보 가져오기 
        const user = await this.$gAuth.signIn()
        const member = {
          google_access_token: user.Zi.access_token,
          id: user.El,
          name: user.w3.ig,
          email: user.w3.U3,
          photo_src: user.w3.Paa
        }

        // DB에 회원 정보 등록 및 가져오기
        const memberData = await this.getApiData(Api.postMember(member))

        // 프로젝트 정보 가져오기
        const projectData = await this.getApiData(Api.getProjectListOfMain(member.id))

        // store에 저장 및 layer 닫기
        this.$store.commit('loggedIn', memberData.member)
        this.$store.commit('closeLayer')   
        this.$store.commit('setState', ['projectList', projectData.list])
      }
    }
  }  
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.login{width:250px;}
.social-buttons li+li{margin-top:5px;}
.btn{text-shadow:none;border-radius:3px;text-align:left;height:40px;line-height:26px;
  i{font-size:18px;}
}
.btn-icon{margin-top:-2px;width:60px;display:inline-block;text-align:center;}
.btn-social-google{background:$color-google;}
.btn-social-naver{background:$color-naver;}
.btn-social-facebook{background:$color-facebook;}
.btn-social-kakao{background:$color-kakao;color:#3c1e1e;}
</style>
