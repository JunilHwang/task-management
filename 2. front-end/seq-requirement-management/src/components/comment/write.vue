<template>
  <section class="comment-wrap">
    <header class="comment-header">
      <strong>이슈 {{commentList.length}}</strong>
    </header>
    <div class="comment-content" v-if="commentList.length">
      <article v-for="(comment, key) in commentList" :key="key">
        <header>
          <div class="writer">
            <strong v-html="comment.writer_name"></strong>
            (<span v-html="comment.writer_id"></span>)  
          </div>
          <div class="reg_date">{{getFlowDate(comment.date)}} 전</div>
        </header>
        <div v-html="(comment.content + '').replace(/\n/gi, '<br />')" />
      </article>
      <form action="" method="post">
        <fieldset><legend>이슈 작성</legend>
          <ul class="comment-write">
            <li class="comment-input">
              <textarea name="content" cols="80" rows="5" placeholder="이슈를 등록해주세요"></textarea>
            </li>
            <li class="comment-button">
              <button type="button">이슈등록</button>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
    <p v-else>등록된 이슈가 없습니다.</p>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        commentList: [
          {
            idx: 1,
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Tenetur quibusdam qui doloribus nostrum eaque expedita earum consectetur quis, dicta ipsa, iste voluptate cumque animi quod impedit veniam mollitia assumenda aperiam.`,
            date: +new Date(`2018-10-06 00:00:00`),
            writer_name: '테스터',
            writer_id: 'test'
          },
          {
            idx: 2,
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Tenetur quibusdam qui doloribus nostrum eaque expedita earum consectetur quis, dicta ipsa, iste voluptate cumque animi quod impedit veniam mollitia assumenda aperiam.`,
            date: +new Date(`2018-10-07 00:00:00`),
            writer_name: '테스터2',
            writer_id: 'test2'
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
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
