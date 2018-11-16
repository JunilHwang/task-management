<template>
  <div>
    <p v-for="(commitData, key) in commitList" :key="key">
      {{commitData.commit.author.email}} /
      {{commitData.commit.author.name}} /
      {{commitData.commit.message}} 
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commitList: []
    }
  },
  created () {
    const apiURL = 'https://api.github.com/repos/lecture4u/capstone-capsequence/commits?per_page=100&sha=&branch=master&access_token=264962a4f21c5d6c0b13d0f4e321899ce3716c69'
    this.$http.get(apiURL).then(res => {
      this.commitList = res.data
      console.log(res.data)
    })
  }
}
</script>