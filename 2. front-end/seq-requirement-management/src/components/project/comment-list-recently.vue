<template>
  <section>
    <h4 class="section-title">업데이트/생성 댓글 Top 10</h4>
    <div class="section-content" v-if="loading">
      <template v-if="commentList.length">
        <article class="comment-component" v-for="(comment, key) in commentList" :key="key">
          <header>
            <div class="writer">
              <span class="photo" :style="`background-image:url(${comment.photo_src})`"></span>
              <strong v-html="comment.writer_name"></strong>
            </div>
            <div class="project-title"><router-link :to="`/project/view/${comment.pidx}`" v-html="comment.project_title" /></div>
            <div class="task-title"><router-link :to="`/task/view/${comment.tidx}`" v-html="comment.task_title" /></div>
            <div class="tag" :class="{complete: comment.tag === '완료', error: comment.tag === '에러'}" v-html="comment.tag" />
            <div class="reg_date">{{getFlowDate(comment.register_date)}} 전</div>
          </header>
          <div v-html="(comment.content + '').replace(/\n/gi, '<br />')" />
        </article>
      </template>
      <p class="none" v-else>구현 목록이 없습니다.</p>
    </div>
    <CustomLoading :loading="loading" />
  </section>
</template>

<script>
  import CustomLoading from '@/components/loading'
  export default {
    components: { CustomLoading },
    props: ['commentList', 'loading']
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.comment-component{background:#fff;padding:10px;border-radius:3px;margin-bottom:10px;border:1px solid #ddd;}
header{line-height:30px;font-size:13px;
  &:after{content:"";display:block;clear:both;}
  >div{float:left;
    +div:before{content:"";display:inline-block;vertical-align:middle;margin:-3px 10px 0;height:10px;width:1px;background:#aaa;}
  }
}
.tag{font-size:13px;
  &.complete{color:$color-naver;}
  &.error{color:$color-google;}
}
.reg_date{color:#666;font-size:13px;}
>div{line-height:160%;font-size:13px;}
.writer{display:flex;align-items:center;}
.photo{width:15px;height:15px;border-radius:15px;background:no-repeat center / cover;margin-right:5px;}
@include mobile () {
  header{line-height:25px;margin-bottom:10px;}
  .task-title{clear:both;
    &:before{content:none;}
  }
}
</style>
