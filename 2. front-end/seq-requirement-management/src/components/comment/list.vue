<template>
  <div>
    <header class="comment-header">
      <strong>댓글 {{commentList.length}}</strong>
    </header>
    <div class="comment-content">
      <section v-if="commentList.length">
        <article class="comment-component" v-for="(comment, key) in commentList" :key="key" :style="{marginLeft: comment.depth * 20 + 'px'}">
          <header>
            <div class="writer">
              <span class="photo" :style="`background-image:url(${comment.photo_src})`"></span>
              <strong v-html="comment.writer_name"></strong>
            </div>
            <div class="tag" :class="{'complete': comment.tag === '완료', 'error': comment.tag === '에러'}" v-html="comment.tag" />
            <div class="reg_date">{{getFlowDate(comment.register_date)}} 전</div>
          </header>
          <div v-html="(comment.content + '').replace(/\n/gi, '<br />')" />
          <footer class="comment-bottom">
            <a :class="{'active': comment.replySwitch}" href="#" @click.prevent="toggleReplyComponent(comment)">답글</a>
            <a :class="{'active': comment.updateSwitch}" v-if="comment.writer === $store.state.member.id" href="#" @click.prevent="toggleUpdateComponent(comment)">수정</a>
            <a v-if="comment.writer === $store.state.member.id" href="#" @click.prevent="commentDelete(comment.cidx)">삭제</a>
          </footer>
          <commentWrite v-if="comment.updateSwitch" :comment="comment" type="update" />
          <commentWrite v-if="comment.replySwitch" :comment="comment" type="reply" />
        </article>
      </section>
      <p class="comment-component" v-else>등록된 댓글이 없습니다.</p>
    </div>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import commentWrite from './write'
  export default {
    components: { commentWrite },
    computed: {
      commentList () { return this.$store.state.commentList }
    },
    created () { this.getCommentList() },
    methods: {
      async getCommentList () {
        const data = await this.getApiData(Api.getCommentList(this.$route.params.tidx))
        data.list.map(obj => {
          obj.updateSwitch = false
          obj.replySwitch = false
        })
        this.$store.commit('setState', ['commentList', data.list])
      },
      toggleUpdateComponent (comment) {
        comment.updateSwitch = !comment.updateSwitch
        comment.replySwitch = false
      },
      toggleReplyComponent (comment) {
        comment.replySwitch = !comment.replySwitch
        comment.updateSwitch = false
      },
      async commentDelete (cidx) {
        if (!confirm('정말로 삭제하시겠습니까?')) return
        await this.getApiData(Api.deleteComment(cidx))
        this.getCommentList()
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
    .tag{font-size:13px;
      &.complete{color:$color-naver;}
      &.error{color:$color-google;}
    }
    .reg_date{color:#666;font-size:13px;}
  }
  >div{line-height:160%;font-size:13px;}
}
.comment-bottom{font-size:11px;display:flex;margin-top:5px;
  a{color:#aaa;
    +a:before{content:"/";display:inline-block;margin:0 5px;}
    &.active{color:#000;font-weight:bold;}
  }
}
.writer{display:flex;align-items:center;}
.photo{width:15px;height:15px;border-radius:15px;background:no-repeat center / cover;margin-right:5px;}
</style>
