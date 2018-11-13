<template>
  <div>
    <header class="comment-header">
      <strong>댓글 {{commentList.length}}</strong>
    </header>
    <div class="comment-content">
      <section v-if="commentList.length">
        <article class="comment-component" v-for="(comment, key) in commentList" :key="key">
          <header>
            <div class="writer">
              <span class="photo" :style="`background-image:url(${comment.photo_src})`"></span>
              <strong v-html="comment.writer_name"></strong>
            </div>
            <div class="tag" v-html="comment.tag" />
            <div class="reg_date">{{getFlowDate(comment.register_date)}} 전</div>
          </header>
          <div v-html="(comment.content + '').replace(/\n/gi, '<br />')" />
        </article>
      </section>
      <p class="comment-component" v-else>등록된 댓글이 없습니다.</p>
    </div>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    computed: {
      commentList () {
        return this.$store.state.commentList
      }
    },
    created () {
      this.getCommentList()
    },
    methods: {
      getCommentList () {
        const response = Api.getCommentList(this.$route.params.tidx).then(response => {
          const data = response.data
          if (!data.success) {
            console.log(data.err)
            return
          }
          this.$store.commit('setState', ['commentList', data.list])
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.comment-header{margin-bottom:10px;border-bottom:1px solid #ddd;padding-bottom:10px;}
.comment-content{border-radius:3px;}
.comment-component{background:$color-grey;padding:10px;border-radius:3px;margin-bottom:10px;border:1px solid #ddd;}
article{
  header{line-height:30px;
    &:after{content:"";display:block;clear:both;}
    >div{float:left;
      +div:before{content:"";display:inline-block;vertical-align:middle;margin:-3px 10px 0;height:10px;width:1px;background:#aaa;}
    }
    .tag{font-size:13px;}
    .reg_date{color:#666;font-size:13px;}
  }
  >div{line-height:160%;font-size:13px;}
}
.writer{display:flex;align-items:center;}
.photo{width:15px;height:15px;border-radius:15px;background:no-repeat center / cover;margin-right:5px;}
</style>
