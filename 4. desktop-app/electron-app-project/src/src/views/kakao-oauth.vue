<template>
  <div></div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    created () {
      const $s = require('scriptjs')
      $s('/js/kakao.sdk.js', () => {
      })
    },
    methods: {
      async signInByNaver (user) {
        const member = {
          id: user.id,
          name: user.name,
          email: user.email,
          photo_src: user.profile_image,
          google_access_token: ''
        }
        const memberResponse = await Api.postMember(member)
        const memberData = memberResponse.data
        if (!memberData.success) throw memberData.err
        this.$store.commit('loggedIn', memberData.member)
        window.opener.location.reload()
        window.close()
      }
    }
  }
</script>
