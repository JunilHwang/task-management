const access = (bool, msg, url = false) => {
  if (!bool) {
    alert(msg)
    url ? router.push(url) : router.go(-1)
  }
}
const memberChk = () => {
  access(store.state.member, '로그인 후 이용해주세요', '/member/login')
}