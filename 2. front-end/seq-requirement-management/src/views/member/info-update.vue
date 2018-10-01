<template>
  <div class="wrap">
    <site-header></site-header>
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <h3 class="content-title">회원정보 변경</h3>
          <div class="member-fields-wrap">
            <form action="" method="post" @submit="infoUpdate">
              <fieldset><legend>비밀번호 변경</legend>
                <ul class="fields">
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-user"></i></span>
                      <input type="text" class="full-width" name="id" style="background: #ccc" required readonly>
                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-envelope"></i></span>
                      <input type="text" class="full-width" name="email" @keyup="emailCheck" required>
                      <span class="lbl">이메일</span>
                      <span class="chk" v-if="emChk">중복된 이메일이 있습니다</span>
                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-lock"></i></span>
                      <input type="password" class="full-width" name="pw" @keyup="pwCheck" required>
                      <span class="lbl">현재 비밀번호를 입력해주세요</span>
                      <span class="chk" v-if="pwChk">현재 비밀번호가 일치하지 않습니다</span>                      

                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-signature"></i></span>
                      <input type="text" class="full-width" :value="member.name" name="name" required>
                      <span class="lbl">이름</span>
                    </label>
                  </li>
                  <li>
                    <label class="input-label">
                      <span class="pre"><i class="fas fa-building"></i></span>
                      <input type="text" class="full-width" :value="member.belong" name="belong" required>
                      <span class="lbl">소속</span>
                    </label>
                  </li>
                  <li>
                    <button type="submit" class="btn btn-full submit">변경완료</button>
                  </li>
                  <li class="btm">
                    <router-link to="/member/mypage" class="btn btn-full default">뒤로가기</router-link>
                    <router-link to="/member/pw-update" class="btn btn-full point">비밀번호 변경</router-link>
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
        emChk: false,
        pwChk: false,
        member: this.$store.state.member
      }
    },
    methods: {
      infoUpdate (e) {
        const frm = e.target
        if (this.member.pw !== frm.pw.value) {
          alert('현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요')
          frm.pw.focus()
          return
        }
        const store = this.$store
        const router = this.$router
        Api.putMemberInfo({
          idx: this.member.idx,
          id: frm.id.value,
          email: frm.email.value,
          name: frm.name.value,
          belong: frm.belong.value,
          success () {
            alert('회원정보가 변경되었습니다. 다시 로그인해주세요')
            store.commit('logout')
            router.push('/member/login')
          }
        })
      },
      emailCheck (e){
        const obj = e.target
        const val = obj.value 
        const name = obj.name
        const email = this.member.email
        if (email === val) {
          this.emChk = false
          return
        }
        Api.liveCheck(val, name).then(res => {
            this.emChk = res.rows.length !== 0  
        }) 
      },
      pwCheck (e) {
        const val = e.target.value
        if (val.length === 0) {
          this.pwChk = false
          return
        }
        this.pwChk = this.member.pw !== val
      }
    },
    mounted () {
      document.forms[0].id.value = this.member.id
      document.forms[0].email.value = this.member.email
    }
  }
</script>

<style lang="scss" src="@/assets/scss/member.scss" scoped></style>
