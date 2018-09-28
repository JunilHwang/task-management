<template>
  <div class="wrap">
    <site-header></site-header>
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <h3 class="content-title">마이페이지</h3>
          <div class="member-fields-wrap">
            <ul class="fields">
              <li>
                <label class="input-label">
                  <span class="pre"><i class="fas fa-user"></i></span>
                  <input type="text" class="full-width readolny" :value="member.id" name="id" required readonly>
                </label>
              </li>
              <li>
                <label class="input-label">
                  <span class="pre"><i class="fas fa-envelope"></i></span>
                  <input type="text" class="full-width readolny" :value="member.email" name="email" required readonly>
                </label>
              </li>
              <li>
                <label class="input-label">
                  <span class="pre"><i class="fas fa-signature"></i></span>
                  <input type="text" class="full-width readolny" :value="member.name" name="name" required readonly>
                </label>
              </li>
              <li>
                <label class="input-label">
                  <span class="pre"><i class="fas fa-building"></i></span>
                  <input type="text" class="full-width readolny" :value="member.belong" name="belong" required readonly>
                </label>
              </li>
              <li class="btm">
                <router-link to="/member/info-update" class="btn btn-full point">회원정보 변경</router-link>
                <router-link to="/member/pw-update" class="btn btn-full point">비밀번호 변경</router-link>
              </li>
            </ul>
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
  export default {
    components: {
      'site-header': Header,
      'site-footer': Footer
    },
    data () {
      return {
        member: this.$store.state.isMember
      }
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss" scoped></style>
