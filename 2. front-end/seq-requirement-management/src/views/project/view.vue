<template>
  <section>
    <h3 class="content-title">프로젝트 상세 조회</h3>
    <section class="project-view" v-if="typeof projectData.idx !== 'undefined'">
      <header>
        <h4 v-html="projectData.subject" />
        <p v-html="projectData.description" />
      </header>
      <ul class="tab-menu">
        <li><a href="#" :class="categoryNow === -1 ? 'active' : null" @click.prevent="setCategory(-1)">전체</a></li>
        <li v-for="(data, key) in categoryList" :key="key"><a href="#" :class="categoryNow === key ? 'active' : null" v-html="data" @click.prevent="setCategory(key)" /></li>
      </ul>
      <div class="btn-group">
        <a href="#" class="btn default" @click.prevent>요구사항 삭제 내역</a>&nbsp;
        <router-link to="/project" class="btn point" @click.prevent>프로젝트 목록</router-link>&nbsp;
        <router-link :to="`/project/setting/${projectData.idx}`" class="btn point" @click.prevent>프로젝트 설정</router-link>&nbsp;
        <a href="#" class="btn submit" @click.prevent>카테고리 관리</a>&nbsp;
        <a href="#" class="btn submit" @click.prevent>요구사항 추가</a>
      </div>
    </section>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    async created () {
      const id = this.$route.params.id
      const uri = decodeURIComponent(this.$route.params.uri)
      this.projectData = (await Api.getProject(id, uri)).rows[0]
    },
    data () {
      return {
        projectData: {},
        categoryNow: -1,
        categoryList: ['test1', 'test2', 'test3', 'test4'],
        uri: this.$route.params.uri
      }
    },
    methods: {
      setCategory (num) {
        this.categoryNow = num
      }
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .project-view{width:800px;margin:0 auto;}
  .section-title{font-size:21px}
</style>
