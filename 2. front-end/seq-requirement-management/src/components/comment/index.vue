<template>
  <section class="comment-wrap">
    <CustomLoading :loading="loading" />
    <commentList :commentList="commentList" v-if="loading" />
    <commentWrite v-if="loading" :comment="null" type="write" />
  </section>
</template>

<script>
  import CustomLoading from '@/components/loading'
  import commentList from './list'
  import commentWrite from './write'
  import Api from '@/middleware/Api.js'

  export default {
    components: { commentList, commentWrite, CustomLoading },
    async created () { this.getCommentList() },
    data () {
      return {
        loading: false,
        commentList: []
      }
    },
    methods: {
      async getCommentList () {
        const data = await this.getApiData(await Api.getCommentList(this.$route.params.tidx))
        data.list.map(obj => {
          obj.updateSwitch = false
          obj.replySwitch = false
        })
        this.commentList = data.list
        this.loading = true
      }
    }
  }
</script>
