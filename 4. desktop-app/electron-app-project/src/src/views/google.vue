<template>
  <div>
    <button @click="signIn">get auth code</button>
    <button @click="signOut">sign out</button>
  </div>
</template>

<!-- <script>
export default {
  methods: {
    signIn () {
      this.$gAuth.signIn()
      .then(GoogleUser => {
        console.log('GoogleUser', GoogleUser) 
      })
      .catch(error  => {
        console.log(error)
      })
    },
    signOut () {
      this.$gAuth.signOut().then(() => {
        console.log('sign out')
      })
    }
  }
}
</script> -->