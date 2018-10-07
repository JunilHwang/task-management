<template>
  <div class="login" v-if="!this.$store.state.member">
    <span class="middle"></span><div>
      <form action="" method="post" @submit="login">
        <fieldset><legend>로그인</legend>
          <h3 class="login-title">로그인</h3>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-user"></i></span>
                <input type="text" name="id" class="full-width" required autofocus>
                <span class="lbl">아이디 혹은 이메일</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-lock"></i></span>
                <input type="password" name="pw" class="full-width" required @keydown="capsLockChk">
                <span class="lbl">비밀번호</span>
                <small v-if="capsLock">CapsLock이 켜져있습니다 </small>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <router-link to="/member/join" class="btn btn-full join">회원가입</router-link>
            </li>
            <li class="btm">
              <label class="checkbox">
                <input type="checkbox" name="auto-login">
                <span class="btn btn-full auto">자동로그인</span>
              </label>
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
    data () {
      return {
        capsLock: false
      }
    }
    ,
    methods: {
      login (e) {
        const frm = e.target
        Api.getMember(frm.id.value, frm.pw.value).then(res => {
          if (res.rows.length) {
            alert('로그인 되었습니다.')
            this.$store.commit('loggedIn', res.rows[0])
            this.$router.push('/project')
          } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            frm.id.focus()
          }
        })
      },
      capsLockChk (e) {
        const el = event.target 
        if(e.getModifierState("CapsLock")) {
          this.capsLock = true
        } else {
          this.capsLock = false
        }
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss"></style>
