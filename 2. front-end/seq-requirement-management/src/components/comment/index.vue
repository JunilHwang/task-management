<template>
  <section class="comment-wrap">
    <header class="comment-header">
      <strong>댓글 {{commentList.length}}</strong>
    </header>
    <div class="comment-content" v-if="commentList.length">
      <commentList />
      <commentWrite />
    </div>
  </section>
</template>
<script>
  export default {
    components: {
      commentList: () => import('./list.vue'),
      commentWrite: () => import('./write.vue')
    }
  }
</script>
<style lang="scss">
@import "@/assets/scss/_lib.scss";
.comment-header{margin-bottom:10px;border-bottom:1px solid #ddd;padding-bottom:10px;}
.comment-content{border-radius:3px;background:$color-grey;padding:15px;}
article{border-bottom:1px dotted #ddd;margin-bottom:15px;padding-bottom:10px;
  header{line-height:30px;
    &:after{content:"";display:block;clear:both;}
    >div{float:left;
      +div:before{content:"";display:inline-block;vertical-align:middle;margin:10px;height:10px;width:1px;background:#aaa;}
    }
    .reg_date{color:#666;}
  }
  >div{line-height:160%;font-size:13px;}
}
.comment-write{display:flex;justify-content:space-between;}
.comment-input{width:calc(100% - 110px);
  textarea{height:80px;box-sizing:border-box;padding:10px;width:100%;border-radius:3px;font-size:13px;}
}
.comment-button{
  button{width:100px;height:80px;border:1px solid #bebebe;background:#fff;border-radius:3px;cursor:pointer;}
}
</style>
