<template>
  <section class="project-main">
    <h3 class="content-title">프로젝트 관리</h3>
    <div class="float-wrap">
      <section class="section">
        <h4 class="section-title">참여 프로젝트 목록</h4>
        <template v-if="projectList.length">
          <article v-for="(data, key) in projectList" :key="key" @click.prevent="projectView(data.uri)">
            <p class="article-title">
              <router-link :to="`/project/view/${$store.state.member.id}/${getURI(data.uri)}`" v-html="data.subject" />
            </p>
            <p class="description" v-html="data.description" />
            <p class="date" v-html="getDateFormat(data.date)" />
          </article>
        </template>
        <p v-else>참여 참여 목록이 없습니다.</p>
      </section>
      <section class="section">
        <h4 class="section-title">이슈 목록</h4>
        <template v-if="issueList.length">
          
        </template>
        <p v-else>이슈 목록이 없습니다.</p>
      </section>
      <section class="section">
        <h4 class="section-title">구현 목록</h4>
        <template v-if="implementList.length">
          
        </template>
        <p v-else>구현 목록이 없습니다.</p>
      </section>
      <section class="section">
        <h4 class="section-title">테스팅 목록</h4>
        <template v-if="testList.length">
          
        </template>
        <p v-else>테스팅 목록이 없습니다.</p>
      </section>
    </div>
    <div class="btn-group right">
      <router-link to="/project/create" class="btn submit">프로젝트 생성</router-link>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    async created () {
      this.projectList = (await Api.getProjectListOfMain()).rows
    },
    data () {
      return {
        projectList: [],
        issueList: [],
        implementList: [],
        testList: []
      }
    },
    methods: {
      getURI: uri => encodeURIComponent(uri),
      projectView (uri) {
        uri = this.getURI(uri)
        this.$router.push(`/project/view/${this.$store.state.member.id}/${uri}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .section{border:1px solid #ddd;margin:15px;padding:40px;border-radius:3px;background:#fafafa}
  .section-title{font-weight:normal;font-size:21px;margin-bottom:15px;}
  .article-title{font-size:21px;color:$color1;margin-bottom:5px;display:block;
    a:hover{text-decoration:none;}
  }
  .description{font-size:17px;margin-bottom:5px}
  .date{font-size:13px;color:#aaa}
  article{background:#fff;padding:20px;border-radius:3px;border:1px solid #ddd;box-shadow:0 0 10px fade-out(#666, .8);transition:.3s;cursor:pointer;
    +article{margin-top:20px;}
    &:hover{box-shadow:0 0 10px fade-out(#666, .3)}
  }
</style>