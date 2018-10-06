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
            <li><a href="#" :class="selectedCategory === -1 ? 'active' : null" @click.prevent="setCategory(-1)">전체</a></li>
              <li v-for="(data, key) in categoryList" :key="key"><a href="#" :class="selectedCategory === key ? 'active' : null" v-html="data.title" @click.prevent="setCategory(key)" /></li>
          </ul>
        </header>
        <div class="requirement">
          <router-view></router-view>
        </div>
      </section>
      <div class="btn-group">
        <a href="#" class="btn default" @click.prevent>요구사항 삭제 내역</a>
        <router-link to="/project" class="btn point" @click.prevent>프로젝트 목록</router-link>
        <router-link :to="`/project/setting/${projectData.idx}`" class="btn point" @click.prevent>프로젝트 설정</router-link>
        <a href="#" class="btn submit" @click.prevent="$store.commit('openLayer')">카테고리 관리</a>
        <router-link :to="`/project/view/${$route.params.id}/${$route.params.uri}/create/${projectData.idx}`" class="btn submit">요구사항 추가</router-link>
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
      const projectData = (await Api.getProject(id, uri)).rows[0]
      const categoryList = (await Api.getCategoryList (projectData.idx)).rows
      this.$store.commit('setState', ['projectData', projectData])
      this.$store.commit('setState', ['categoryList', categoryList])
      this.$store.commit('setState', ['pidx', projectData.idx])
      this.setCategory(-1)
      this.setCardList()
    },
    data () {
      return {
        uri: this.$route.params.uri
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      },
      selectedCategory () {
        return this.$store.state.selectedCategory
      },
      projectData () {
        return this.$store.state.projectData
      }
    },
    methods: {
      setCategory (num) {
        this.$store.commit('setState', ['selectedCategory', num, this.setCardList])
      },
      setCardList () {
        const store = this.$store
        Api.getCardList(store.state.pidx, store.state.selectedCategory).then(res => {
          store.commit('setState', ['cardList', res.rows])
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .project-view{}
  .project-header{border-bottom:1px solid #bebebe;margin-bottom:20px;padding-bottom:20px;
    h4{font-size:25px;padding-bottom:5px;}
    p{font-size:17px;color:#666;}
  }
  .cards{
    header{margin-bottom:20px}
  }
  .requirement{background:$color-grey;border-radius:3px;border:1px solid #ddd;min-height:200px;padding:30px;}
</style>
