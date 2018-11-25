<template>
  <form action="" method="post" @submit="submitComment">
    <fieldset><legend>댓글 작성</legend>
      <ul class="comment-write">
        <div class="writer">
          <div class="profile-box">
            <span class="profile" :style="`background-image:url(${$store.state.member.photo_src})`"></span>
            <span class="name">{{$store.state.member.name}}</span>
          </div>
          <div class="tag-list">
            <ul>
              <li v-for="(tag, key) in tagList" :key="key">
                <label>
                  <input type="radio" name="tag" :value="tag.value" :checked="setChecked(key, tag.value)">
                  <span v-html="tag.text" />
                </label>
              </li>
            </ul>
          </div>
        </div>
        <li class="comment-input">
          <textarea name="content" cols="80" rows="5" :placeholder="type === 'reply' ? '답글을 입력해주세요' : '댓글을 입력해주세요'" wrap="virtual" v-html="type === 'update' ? comment.content : null" required></textarea>
        </li>
        <li class="comment-button">
          <button type="submit">댓글등록</button>
        </li>
      </ul>
    </fieldset>
  </form>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    props: ['comment', 'type'],
    data () {
      return {
        tagList: [
          {value:'기타', text:'기타'},
          {value:'에러', text:'에러'},
          {value:'완료', text:'완료'}
        ]
      }
    },
    methods: {
      submitComment (e) {
        const submitMethod = {write: this.postComment, update: this.putComment, reply: this.postCommentReply}
        submitMethod[this.type](e.target)
      },
      setChecked (key, tag) {
        return this.type === 'update' ? tag === this.comment.tag : key === 0
      },
      async postComment (frm) {
        const params = {
          tidx: this.$route.params.tidx,
          parent: 0,
          depth: 0,
          tag: frm.tag.value,
          writer: this.$store.state.member.id,
          content: frm.content.value
        }
        await this.getApiData(Api.postComment(params))
        this.$parent.getCommentList()
        frm.content.value = ''
      },
      async putComment (frm) {
        this.comment.tag = frm.tag.value
        this.comment.content = frm.content.value
        await this.getApiData(Api.postComment(this.comment))
        this.comment.updateSwitch = false
      },
      async postCommentReply (frm) {
        const params = {
          tidx: this.$route.params.tidx,
          parent: this.comment.cidx,
          depth: this.comment.depth + 1,
          od: this.comment.od + 1,
          tag: frm.tag.value,
          writer: this.$store.state.member.id,
          content: frm.content.value
        }
        await this.getApiData(Api.postCommentReply(params))
        this.$parent.$parent.getCommentList()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.writer{width:120px;display:flex;flex-flow:column;justify-content:center;align-items:center;}
.profile-box{display:flex;align-items:center;line-height:20px;margin-bottom:10px;}
.profile{width:15px;height:15px;border-radius:15px;background:no-repeat center / cover;margin-right:5px;}
.name{font-size:13px;}
.tag-list{display:flex;align-items:center;
  ul{display:flex;}
  li{margin-right:2px;}
  label{display:block;}
  span{display:block;border:1px solid #ddd;border-radius:3px;font-size:12px;padding:2px 5px;cursor:pointer;transition:0.5s;}
  input{display:none;
    &:checked + span{background:#444;border-color:#444;color:#fff;}
  }
}
.comment-write{display:flex;justify-content:space-between;margin-top:10px;}
.comment-input{width:calc(100% - 230px);
  textarea{height:80px;box-sizing:border-box;padding:10px;width:100%;border-radius:3px;font-size:13px;}
}
.comment-button{
  button{width:100px;height:80px;border:1px solid #bebebe;background:#fff;border-radius:3px;cursor:pointer;}
}
@include mobile () {
  .writer{width:100%;margin-bottom:10px;align-items:flex-start;}
  .comment-write{display:block;}
  .comment-input{width:100%;
    textarea{height:120px;}
  }
  .comment-button{
    button{width:100%;height:40px;margin-top:5px;}
  }
}
</style>
