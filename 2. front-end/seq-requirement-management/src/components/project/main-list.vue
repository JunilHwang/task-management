<template>
  <section class="float-wrap">
    <h4 class="section-title" v-html="title" />
    <div class="section-content float-wrap" v-if="loading">
      <template v-if="projectList.length">
        <article v-for="(project, key) in projectList" :key="key" >
          <div @click.prevent="$router.push(`/project/view/${project.pidx}`)">
            <p class="article-title" v-html="contentPreview(project.title,20)" />
            <p class="description" v-html="contentPreview(project.description,45)" />
            <p class="date" v-html="getDateFormat(project.register_date)" />
          </div>
          <a v-if="!isStar" href="#" class="star" :class="{active: project.star}" @click.prevent="icon(project.pidx, project.star !== undefined)">
            <i class="far fa-star"></i>
          </a>
        </article>
      </template>
      <p class="none" v-else>참여 참여 목록이 없습니다.</p>
    </div>
    <CustomLoading :loading="loading" />
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import CustomLoading from '@/components/loading'

  export default {
    components: { CustomLoading },
    data () {
      const isStar = this.type === 'star'
      return {
        isStar,
        title: isStar ? '즐겨찾기' : '참여 프로젝트',
        midx: this.$store.state.member.midx
      }
    },
    methods: {
      async icon (pidx, star) {
        star = +!star
        const mid = this.$store.state.member.id
        await this.getApiData(Api.putProjectStar({pidx, mid, star}))
        this.$parent.getProjectList()
      },
    },
    props: ['projectList', 'type', 'loading']
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.description{font-size:13px;margin-bottom:5px;height:20px;}
.date{font-size:13px;color:#aaa}
article{position:relative;background:#fff;padding:10px 15px;border-radius:3px;border:1px solid #ddd;transition:.3s;cursor:pointer;float:left;width:calc(50% - 5px);box-sizing:border-box;margin-bottom:10px;
  &:nth-child(2n){margin-left:10px;}
  &:hover{border-color:#000;}
}
.star{color:$color-kakao;position:absolute;font-size:20px;right:10px;bottom:10px;
  &.active, &:hover{
    i{font-weight:bold;}
  }
}
@include mobile () {
  .description{font-size:13px;margin-bottom:5px;height:20px;}
  .date{font-size:13px;color:#aaa}
  article{padding:10px;float:none;width:auto;
    &:nth-child(2n){margin-left:0;}
  }
}
</style>
