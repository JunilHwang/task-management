<template>
  <div class="login" v-if="!this.$store.state.member">
    <span class="middle"></span><div>
      <form action="" method="post" @submit="signUp">
        <fieldset><legend>회원가입</legend>
          <h3 class="login-title">회원가입</h3>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-user"></i></span>
                <input type="text" name="id" class="full-width" @keydown="liveCheck" required>
                <span class="lbl">아이디</span>
                <span class="chk" v-if="idChk">중복된 아이디가 있습니다</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-lock"></i></span>
                <input type="password" name="pw" class="full-width" required>
                <span class="lbl">비밀번호</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-lock"></i></span>
                <input type="password" name="pw_re" class="full-width" @keydown="pwCheck" required>
                <span class="lbl">비밀번호 확인</span>
                <span class="chk" v-if="pwChk">비밀번호가 일치하지 않습니다</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-envelope"></i></span>
                <input type="text" name="email" class="full-width" @keydown="liveCheck" required>
                <span class="lbl">이메일</span>
                <span class="chk" v-if="emChk">중복된 이메일이 있습니다</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-signature"></i></span>
                <input type="text" name="name" class="full-width" required>
                <span class="lbl">이름</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-building"></i></span>
                <input type="text" name="belong" class="full-width" required>
                <span class="lbl">소속</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li class="btm">
              <router-link to="/member/login" class="btn btn-full default">로그인</router-link>
              <router-link to="/member/pw-search" class="btn btn-full default">비밀번호 찾기</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js' 

  export default {
    created () {
      this.$notMemberChk()
    },
    mounted () {
      document.forms[0].id.focus()
    },
    data() {
      return {
        idChk: false,
        pwChk: false,
        emChk: false
      }
    },
    methods: {
      liveCheck (e) {
        const frm = e.target

        Api.liveCheck(frm.value, frm.name).then(res => {
          if(frm.name == "id") {
            this.idChk = res.rows.length !== 0       
          } else {
            this.emChk = res.rows.length !== 0  
          }
        })
      },
      pwCheck (e) {
        this.pwChk = e.target.value !== document.forms[0].pw.value
      }
      ,
      signUp (e) {
        const frm = e.target
        if (frm.pw.value !== frm.pw_re.value) {
          alert('비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요')
          frm.pw_re.focus()
          return
        }
        const router = this.$router
        Api.postMember({
          idx: frm.id.value,
          id: frm.id.value,
          pw: frm.pw.value,
          name: frm.name.value,
          email: frm.email.value,
          belong: frm.belong.value,
          success () {
            alert('회원가입이 완료되었습니다.')
            router.push('/member/login')
          }
        })
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss">\

</style>
