<template>
  <div class="wrap">
    <site-header></site-header>
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <h3 class="content-title">비밀번호 변경</h3>
          <div class="member-fields-wrap">
            <form action="" method="post" @submit="pwUpdate">
              <fieldset><legend>비밀번호 변경</legend>
                <ul class="fields">
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-lock"></i></span>
                      <input type="password" class="full-width" name="pw_origin" @keyup="liveCheck" required>
                      <span class="lbl">현재 비밀번호를 입력해주세요</span>
                      <span class="chk" v-if="pwOrgChk">현재 비밀번호가 일치하지 않습니다</span>                      
                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-lock"></i></span>
                      <input type="password" class="full-width" name="pw" @keyup="liveCheck" required>
                      <span class="lbl">새 비밀번호를 입력해주세요</span>
                      <span class="chk" v-if="pwNewChk">현재 비밀번호와 동일합니다</span>

                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-lock"></i></span>
                      <input type="password" class="full-width" name="pw_re" @keyup="liveCheck" required>
                      <span class="lbl">새 비밀번호를 다시 입력해주세요</span>
                      <span class="chk" v-if="pwNewReChk">새 비밀번호와 일치하지 않습니다</span>

                    </label>
                  </li>
                  <li>
                    <button type="submit" class="btn btn-full submit">변경완료</button>
                  </li>
                  <li class="btm">
                    <router-link to="/member/mypage" class="btn btn-full default">뒤로가기</router-link>
                    <router-link to="/member/info-update" class="btn btn-full point">회원정보 변경</router-link>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import Footer from '@/components/footer.vue'
  import Api from '@/middleware/Api.js'
  export default {
    components: {
      'site-header': Header,
      'site-footer': Footer
    },
    data () {
      return {
        member: this.$store.state.member,
        pwOrgChk: false,
        pwNewChk: false,
        pwNewReChk: false
      }
    },
    mounted () {
      document.forms[0].pw_origin.focus()
    },
    methods: {
      liveCheck (e) {
        const frm = e.target
        const pw = this.member.pw
        console.log(pw)
        
        if (frm.name == "pw_origin") {
          if (frm.value == "") {
            this.pwOrgChk = false
          } else {
            this.pwOrgChk = pw !== frm.value
          }
        } else if (frm.name == "pw") {
          this.pwNewChk = pw === frm.value 
        } else {
          this.pwNewReChk = frm.value !== document.forms[0].pw.value
          if (frm.value == ""){
            this.pwNewReChk = false
          }
        }
      }
      ,
      pwUpdate (e) {
        const member = this.member
        const frm = e.target
        const router = this.$router
        if (member.pw !== frm.pw_origin.value) {
          alert('현재 비밀번호가 일치하지 않습니다')
          frm.pw_origin.focus()
          return 
        }
        if (frm.pw.value !== frm.pw_re.value) {
          alert('새 비밀번호와 재입력 비밀번호가 일치하지 않습니다')
          frm.pw_re.focus()
          return
        }
        Api.putMemberPassword({
          idx: member.idx,
          pw: frm.pw.value
        }).then(() => {
          this.$store.commit('logout')
          alert('비밀번호가 변경되었습니다. 다시 로그인해주세요')
          router.push('/member/login')
        })
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss" scoped></style>
