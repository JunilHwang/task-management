<template>
  <section>
    <h3 class="content-title">프로젝트 상세 조회</h3>
    <section class="project-view" v-if="typeof projectData.idx !== 'undefined'">
      <header class="project-header">
        <h4 v-html="projectData.subject" />
        <p v-html="projectData.description" />
      </header>
      <section class="cards">
        <header>
          <ul class="tab-menu">
            <li><a href="#" :class="categoryNow === -1 ? 'active' : null" @click.prevent="setCategory(-1)">전체</a></li>
              <li v-for="(data, key) in categoryList" :key="key"><a href="#" :class="categoryNow === key ? 'active' : null" v-html="data.title" @click.prevent="setCategory(key)" /></li>
          </ul>
        </header>
        <div>
          
        </div>
      </section>
      <div class="btn-group">
        <a href="#" class="btn default" @click.prevent>요구사항 삭제 내역</a>&nbsp;
        <router-link to="/project" class="btn point" @click.prevent>프로젝트 목록</router-link>&nbsp;
        <router-link :to="`/project/setting/${projectData.idx}`" class="btn point" @click.prevent>프로젝트 설정</router-link>&nbsp;
        <a href="#" class="btn submit" @click.prevent="$store.commit('openLayer')">카테고리 관리</a>&nbsp;
        <a href="#" class="btn submit" @click.prevent>요구사항 추가</a>
      </div>
      <layerTemplate v-if="$store.state.layerState" layerContent="category" :send="{pidx: projectData.idx}"></layerTemplate>
    </section>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import layerTemplate from '@/components/layerTemplate'
  export default {
    components: {
      layerTemplate
    },
    async created () {
      const id = this.$route.params.id
      const uri = decodeURIComponent(this.$route.params.uri)
      this.projectData = (await Api.getProject(id, uri)).rows[0]
      const categoryList = (await Api.getCategoryList (this.projectData.idx)).rows
      this.$store.commit('setCategoryList', categoryList)
    },
    data () {
      return {
        projectData: {},
        categoryNow: -1,
        uri: this.$route.params.uri
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      }
    },
    methods: {
      setCategory (num) {
        this.categoryNow = num
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .project-view{}
  .project-header{border-bottom:1px solid #bebebe;margin-bottom:20px;padding-bottom:20px;
    h4{font-size:25px;padding-bottom:5px;}
    p{font-size:17px;color:#666;}
  }
  .cards{
    header{margin-bottom:20px}
    >div{background:#f5f5f5;border-radius:3px;border:1px solid #ddd;min-height:400px;}
  }
</style>
