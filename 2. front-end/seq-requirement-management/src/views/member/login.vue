<template>
  <div class="login">
    <span class="middle"></span><div>
      <form action="" method="post">
        <fieldset><legend>로그인</legend>
          <h3 class="login-title">로그인</h3>
          <ul>
            <li>
              <label class="input-label">
                <input type="text" name="id" class="full-width" required autofocus>
                <span class="lbl">아이디 혹은 이메일</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <input type="password" name="pw" class="full-width" required>
                <span class="lbl">비밀번호</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-login submit">작성완료</button>
            </li>
            <li>
              <router-link to="/member/join" class="btn btn-login join">회원가입</router-link>
            </li>
            <li class="btm">
              <label class="checkbox">
                <input type="checkbox" name="auto-login">
                <span class="btn btn-login auto">자동로그인</span>
              </label>
              <router-link to="/member/pw-search" class="btn btn-login default">비밀번호 찾기</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" src="@/assets/scss/member.scss"></style>
