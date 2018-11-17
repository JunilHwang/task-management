<template>
  <div></div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    created () {
      const $s = require('scriptjs')
      $s('/js/naver.sdk.js', () => {
        const naverLogin = new window.naver.LoginWithNaverId({
          clientId: "onePygBsyBG0fbTiQKSI",
          callbackUrl: "http://localhost:8080/naver/oauth",
          isPopup: true,
          callbackHandle: true
        })
        /* (4) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
        naverLogin.init();

        /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
        naverLogin.getLoginStatus(status => {
          if (status) {
            /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
            const email = naverLogin.user.getEmail()
            if( email == undefined || email == null) {
              alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.');
              /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
              naverLogin.reprompt()
              return
            }
            this.signInByNaver(naverLogin.user)
          } else {
            throw 'callback 처리에 실패하였습니다.';
          }
        })
      })
    },
    methods: {
      async signInByNaver (user) {
        const member = {
          id: user.id,
          name: user.name,
          email: user.email,
          photo_src: user.profile_image,
          google_access_token: '',
          kakao_access_token: ''
        }
        const memberData = await this.getApiData(await Api.postMember(member))

        //window.opener.naverCallback(memberData.member)
        this.$store.commit('loggedIn', memberData)
        window.opener.location.reload()
        window.close()
      }
    }
  }
</script>
