<template>
  <section class="project-main">
    <h3 class="content-title">프로젝트 관리</h3>
    <div class="float-wrap">
      <section class="section float-wrap">
        <h4 class="section-title">즐겨찾기</h4>
        <template v-if="projectList.length">
          <article v-for="(data, key) in projectList" :key="key" v-if="data.star == 1" >
            <div @click.prevent="projectView(data.writer, data.uri, data.idx)">
              <p class="article-title" v-html="data.subject" />
              <p class="description" v-html="data.description" />
              <p class="date" v-html="getDateFormat(data.date)" />
            </div>
            <i :class="data.star==1 ? 'star' : null" 
            @click.prevent="icon(data.idx, data.star)" class="color far fa-star animated fadeInRight"></i>
          </article>
        </template>
        <p v-else>즐겨찾기 된 목록이 없습니다</p>
      </section>

      <section class="section float-wrap viewd">
        <h4 class="section-title">최근에 조회한 프로젝트</h4>
        <template v-if="projectList.length">
          <div class="view-box" >
            <div class="viewed-ul" :style="{width: 'calc(33.333% * '+this.viewCount+')'}">
              <article class="viewed-li" 
              v-for="(data, key) in viewedProject" :key="key" 
              v-if="date-(data.viewDate/1000).toFixed(0) < (60*60*24*7)" >
              <div @click.prevent="projectView(data.writer, data.uri, data.idx)">
                <p class="article-title" v-html="data.subject" />
                <p class="description" v-html="data.description" />
                <p class="date" v-html="getDateFormat(data.date)" />
              </div>
              <i :class="data.star==1 ? 'star' : null" 
              @click.prevent="icon(data.idx, data.star)" class="color far fa-star animated fadeInRight"></i>
            </article>
          </div>
        </div>
      </template>
      <p v-else>최근에 조회한 프로젝트 목록이 없습니다</p>
      <i @click="previousSlide" class="fas fa-angle-left left"></i>
      <i @click="nextSlide" class="fas fa-angle-right right"></i>
    </section>

    <section class="section float-wrap">
      <h4 class="section-title">참여 프로젝트 목록</h4>
      <template v-if="projectList.length">
        <article v-for="(data, key) in projectList" :key="key" >
          <div @click.prevent="projectView(data.writer, data.uri, data.idx)">
            <p class="article-title" v-html="data.subject" />
            <p class="description" v-html="data.description" />
            <p class="date" v-html="getDateFormat(data.date)" />
          </div>
          <i :class="data.star==1 ? 'star' : null" 
          @click.prevent="icon(data.idx, data.star)" class="color far fa-star animated fadeInRight"></i>
        </article>
      </template>
      <p v-else>참여 참여 목록이 없습니다.</p>
    </section>


    <section class="section float-wrap">
      <h4 class="section-title">이슈 목록</h4>
      <template v-if="issueList.length">

      </template>
      <p v-else>이슈 목록이 없습니다.</p>
    </section>
    <section class="section float-wrap">
      <h4 class="section-title">구현 목록</h4>
      <template v-if="implementList.length">

      </template>
      <p v-else>구현 목록이 없습니다.</p>
    </section>
    <section class="section float-wrap">
      <h4 class="section-title">테스팅 목록</h4>
      <template v-if="testList.length">

      </template>
      <p v-else>테스팅 목록이 없습니다.</p>
    </section>
  </div>
  <div class="btn-group right fix">
    <router-link to="/project/create" class="btn submit">프로젝트 생성</router-link>
  </div>
</section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    async created () {
      this.projectList = (await Api.getProjectListOfMain(this.$store.state.member.idx)).rows
      this.$store.commit('setState', ['projectList', this.projectList])
    },
    data () {
      return {
        projectList: [],
        issueList: [],
        implementList: [],
        testList: [],
        date: (+new Date()/1000).toFixed(0),
        viewCount: 0,
      }
    },

    computed: {
      viewedProject: function () {
        return _.orderBy(this.projectList, 'viewDate', 'desc')
      }
    },
    updated () {
      this.viewCount = document.getElementsByClassName("viewed-li").length
      console.log(this.viewCount)
    },
    methods: {
      getURI: uri => encodeURIComponent(uri),
      async projectView (writer, uri, idx) {
        uri = this.getURI(uri)
        Api.putViewDate(idx)
        this.$router.push(`/project/view/${writer}/${uri}`)
      },
      async icon (idx, star) {
        if (star === 0) {
          star = 1
        } else {
          star = 0
        }
        Api.putStar({idx, star})
        this.projectList = (await Api.getProjectListOfMain(this.$store.state.member.idx)).rows
      },
      previousSlide () {

      },
      nextSlide () {

      },
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.section{border:1px solid #ddd;margin:15px;padding:40px;border-radius:3px;background:$color-grey}
.section-title{font-weight:normal;font-size:21px;margin-bottom:15px;}
.article-title{font-size:21px;color:$color1;margin-bottom:5px;display:block;height:25px;
  a:hover{text-decoration:none;}
}
.description{font-size:17px;margin-bottom:5px;height:20px;}
.date{font-size:13px;color:#aaa}
article{position: relative;background:#fff;padding:20px;border-radius:3px;border:1px solid #ddd;box-shadow:0 0 10px fade-out(#666, .8);transition:.3s;cursor:pointer;width:calc(33.3333% - 20px);float:left;box-sizing:border-box;margin:0 10px;
  &:hover{box-shadow:0 0 10px fade-out(#666, .3);}
  &>i {display: none; color: #FFCC00;}
  &:hover>i {position: absolute; display: block; font-size: 20px; right: 5%; bottom :10%; padding: 5px;}
  &>i:hover {font-weight: bold; }
}
.star { font-weight: bold}
.viewd {position: relative; overflow: hidden;
  &>i { position: absolute; cursor:pointer; font-size: 50px; color: #bbb; top:calc(50% - 5px); }
}
.left { left: 1%}
.right { right: 1%}

.viewed-ul { display: flex; }
.viewed-li { width: 25% }
.view-box { overflow: hidden; }
</style>