<template>
  <div class="login">
    <span class="middle"></span><div>
      <form action="" method="post">
        <fieldset><legend>회원가입</legend>
          <h3 class="login-title">회원가입</h3>
          <ul>
            <li>
              <label class="input-label">
                <input type="text" name="id" class="full-width" required autofocus>
                <span class="lbl">아이디</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="text" name="pw" class="full-width" required>
                <span class="lbl">비밀번호</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="password" name="pw" class="full-width" required>
                <span class="lbl">비밀번호 확인</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="password" name="email" class="full-width" required>
                <span class="lbl">이메일</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="text" name="name" class="full-width" required>
                <span class="lbl">이름</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="text" name="belong" class="full-width" required>
                <span class="lbl">소속</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-login submit">작성완료</button>
            </li>
            <li class="btm">
              <router-link to="/member/login" class="btn btn-login default">로그인</router-link>
              <router-link to="/member/pw-search" class="btn btn-login default">비밀번호 찾기</router-link>
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
    document.forms[0].id.focus()
  }
}
</script>

<style lang="scss" src="@/assets/scss/member.scss"></style>
