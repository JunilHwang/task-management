<template>
  <section class="project-main">
    <div class="float-wrap">
      <section class="section float-wrap">
        <h4 class="section-title">즐겨찾기</h4>
        <template v-if="projectList.length">
          <article v-for="(data, key) in projectList" :key="key" v-if="data.star == 1">
            <div @click.prevent="$router.push(`/project/view/${data.pidx}`)">
              <p class="article-title" v-html="data.title" />
              <p class="description" v-html="data.description" />
              <p class="date" v-html="getDateFormat(data.register_date)" />
            </div>
            <i :class="data.star==1 ? 'star' : null" 
            @click.prevent="icon(data.pidx, data.star)" class="color far fa-star animated fadeInRight"></i>
          </article>
        </template>
        <p v-else>즐겨찾기 된 목록이 없습니다</p>
      </section>
      <section class="section float-wrap viewd">
        <h4 class="section-title">최근에 조회한 프로젝트</h4>
        <template v-if="projectList.length">
          <div class="view-box" >
            <div class="viewed-ul" :style="{width: `calc(33.333% * ${viewCount})`, marginLeft: -pos / 3 * 100 + '%'}">
              <article style="width:100%" class="viewed-li" v-for="(data, key) in viewedProject" :key="key" v-if="date-(data.viewDate/1000).toFixed(0) < (60*60*24*7)" >
                <div @click.prevent="$router.push(`/project/view/${data.pidx}`)">
                  <p class="article-title" v-html="data.subject" />
                  <p class="description" v-html="data.description" />
                  <p class="date" v-html="getDateFormat(data.date)" />
                  <p>{{key}} </p>
                </div>
                <i :class="data.star==1 ? 'star' : null" 
                @click.prevent="icon(data.idx, data.star)" class="color far fa-star animated fadeInRight"></i>
              </article>
            </div>
          </div>
        </template>
        <p v-else>최근에 조회한 프로젝트 목록이 없습니다</p>
        <i @click="previousSlide" class="fas fa-angle-left left" :class="pos < 3 ? 'block' : null" ></i>
        <i @click="nextSlide" class="fas fa-angle-right right" :class="viewCount < 4 ? 'block'  : viewCount < pos+3 ? 'block' : null"></i>
      </section>
      <section class="section float-wrap">
        <h4 class="section-title">참여 프로젝트 목록</h4>
        <template v-if="projectList.length">
          <article v-for="(data, key) in projectList" :key="key" >
            <div @click.prevent="$router.push(`/project/view/${data.pidx}`)">
              <p class="article-title" v-html="data.title" />
              <p class="description" v-html="data.description" />
              <p class="date" v-html="getDateFormat(data.register_date)" />
            </div>
            <i :class="data.star==1 ? 'star' : null" 
            @click.prevent="icon(data.pidx, data.star)" class="color far fa-star animated fadeInRight"></i>
          </article>
        </template>
        <p v-else>참여 참여 목록이 없습니다.</p>
      </section>
      <section class="section float-wrap">
        <h4 class="section-title">업데이트/생성 테스크 Top 10</h4>
        <template v-if="taskList.length">

        </template>
        <p v-else>이슈 목록이 없습니다.</p>
      </section>
      <section class="section float-wrap">
        <h4 class="section-title">업데이트/생성 댓글 Top 10</h4>
        <template v-if="commntList.length">

        </template>
        <p v-else>구현 목록이 없습니다.</p>
      </section>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import _ from 'lodash'
  export default {
    created () {
      if (this.$store.state.member) {
        this.setProjectList()
      }
    },
    data () {
      return {
        taskList: [],
        commntList: [],
        testList: [],
        date: (+new Date()/1000).toFixed(0),
        viewCount: 0,
        pos: 0,
      }
    },
    computed: {
      viewedProject () {
        return _.orderBy(this.$store.state.projectList, 'viewDate', 'desc')
      },
      projectList () {
        return this.$store.state.projectList
      }
    },
    updated () {
      this.viewCount = document.getElementsByClassName("viewed-li").length
    },
    methods: {
      getURI: uri => encodeURIComponent(uri),
      async icon (pidx, star) {
        star = star === 0 ? 1 : 0
        await this.getApiData(Api.putProjectStar({pidx, star}))
        this.setProjectList()
      },
      previousSlide () {
        if (this.viewCount < 3 || this.pos === 0) {
          return 
        }
        this.pos -= 3
      },
      nextSlide () {
        let viewCount = this.viewCount
        if (this.pos + 3 > viewCount - 1) return
        this.pos  = this.pos + 3
      },
      setProjectList () {
        Api.getProjectListOfMain(this.$store.state.member.id).then(response => {
          this.$store.commit('setState', ['projectList', response.data.list])
          this.pos = 0
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_lib.scss";
.section{border:1px solid #ddd;margin:15px;padding:20px;border-radius:3px;background:#fff}
.section-title{font-weight:normal;font-size:17px;margin-bottom:15px;}
.article-title{font-size:17px;color:$color1;margin-bottom:5px;display:block;height:25px;
  a:hover{text-decoration:none;}
}
.description{font-size:13px;margin-bottom:5px;height:20px;}
.date{font-size:13px;color:#aaa}
article{position: relative;background:#fff;padding:20px;border-radius:3px;border:1px solid #ddd;transition:.3s;cursor:pointer;width:calc(33.3333% - 20px);float:left;box-sizing:border-box;margin:0 10px;
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
.block { display: none }

.viewed-ul { display: flex; transition:1s;}
.view-box { overflow: hidden; } 

</style>