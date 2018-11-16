<template>
  <div class="login">
    <span class="middle"></span><div>
      <form action="" method="post">
        <fieldset><legend>비밀번호 찾기</legend>
          <h3 class="login-title">비밀번호 찾기</h3>
          <ul class="fields">
            <li>
              <label class="input-label">
                <input type="text" name="email" class="full-width" required autofocus>
                <span class="lbl">이메일 입력</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
            </li>
            <li class="btm">
              <router-link to="/member/login" class="btn btn-full default">로그인</router-link>
              <router-link to="/member/join" class="btn btn-full default">회원가입</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.forms[0].email.focus()
  }
}
</script>

<style lang="scss" src="@/assets/scss/member.scss"></style>
