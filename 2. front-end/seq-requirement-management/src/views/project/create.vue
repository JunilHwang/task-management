<template>
  <section>
    <h3 class="content-title">프로젝트 생성</h3>
    <div class="project-create">
      <form action="" method="post" @submit="projectCreate">
        <fieldset><legend>프로젝트 생성</legend>
          <ul class="fields">
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-file-signature"></i></span>
                <input type="text" name="subject" class="full-width" required>
                <span class="lbl">제목</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-align-left"></i></span>
                <input type="text" name="description" class="full-width" required>
                <span class="lbl">간략 설명</span>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-map-marker-alt"></i></span>
                <input type="text" name="uri" class="full-width" required>
                <span class="lbl">URI</span>
              </label>
            </li>
            <li class="search-wrap">
              <label class="input-label">
                <span class="pre"><i class="fas fa-user-tie"></i></span>
                <input type="text" name="c_search" class="full-width" @keyup="search" @blur="searchClose" placeholder="클라이언트 : 검색해주세요">
              </label>
              <div id="clientSearchList" class="search-list" v-if="searchedClient.length > 0">
                <p v-for="(data, idx) in searchedClient" :key="idx">
                  <a v-if="!~selectedClientIdx.indexOf(data.idx)" href="#" @click.prevent="selectedAdd(data, 'Client')" v-html="obj2txt(data)" />
                  <a v-else href="#" class="active" v-html="obj2txt(data)" />
                </p>
              </div>
              <div class="selected-list float-wrap" v-if="selectedClient.length > 0">
                <p v-for="(data, idx) in selectedClient" :key="idx">
                  <span v-html="data.id" />
                  <a href="#" @click.prevent="selectedRemove(data, 'Client')"><i class="fas fa-times"></i></a>
                </p>
              </div>
            </li>
            <li class="search-wrap">
              <label class="input-label">
                <span class="pre"><i class="fas fa-user-friends"></i></span>
                <input type="text" name="t_search" class="full-width" @keyup="search" @blur="searchClose" placeholder="팀 구성 : 검색해주세요">
              </label>
              <div id="teamSearchList" class="search-list" v-if="searchedTeam.length > 0">
                <p v-for="(data, idx) in searchedTeam" :key="idx">
                  <a v-if="!~selectedTeamIdx.indexOf(data.idx)" href="#" @click.prevent="selectedAdd(data, 'Team')" v-html="obj2txt(data)" />
                  <a v-else href="#" class="active" v-html="obj2txt(data)" />
                </p>
              </div>
              <div class="selected-list float-wrap" v-if="selectedTeam.length > 0">
                <p v-for="(data, idx) in selectedTeam" :key="idx">
                  <span v-html="data.id" />
                  <a href="#" @click.prevent="selectedRemove(data, 'Team')"><i class="fas fa-times"></i></a>
                </p>
              </div>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <router-link to="/project" type="submit" class="btn btn-full default">목록으로</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    data () {
      return {
        searchedClient: [],
        searchedTeam: [],
        selectedClient: [],
        selectedClientIdx: [],
        selectedTeam: [],
        selectedTeamIdx: []
      }
    },
    methods: {
      async search (e) {
        const target = e.target
        const name = target.name
        const val = target.value
        const targetName = name === 'c_search' ? 'Client' : 'Team'
        const idxs = this.selectedClientIdx.concat(this.selectedTeamIdx)
        idxs.push(this.$store.state.member.idx)
        const res = await Api.searchMember(val, idxs.join(','))
        this[`searched${targetName}`] = val.length ? res.rows : []
      },
      searchClose () {
        const _this = this
        setTimeout(() => {
          _this.searchedClient = []
          _this.searchedTeam = []
          document.forms[0].c_search.value = ''
          document.forms[0].t_search.value = ''
        }, 150)
      },
      selectedAdd (obj, targetName) {
        this[`selected${targetName}`].push(obj)
        this[`selected${targetName}Idx`].push(obj.idx)
        this.searchClose()
      },
      selectedRemove (obj, targetName) {
        const idx = this[`selected${targetName}Idx`].indexOf(obj.idx)
        this[`selected${targetName}`].splice(idx, 1)
        this[`selected${targetName}Idx`].splice(idx, 1)
      },
      projectCreate (e) {
        const frm = e.target
        this.selectedTeamIdx.push(this.$store.state.member.idx)
        const data = {
          writer: this.$store.state.member.id,
          subject: frm.subject.value,
          description: frm.description.value,
          uri: frm.uri.value,
          client: this.selectedClientIdx,
          team: this.selectedTeamIdx
        }
        const router = this.$router
        Api.projectCreate(data).then(() => {
          alert('완료되었습니다')
          router.push('/project')
        })
      },
      obj2txt: obj => `${obj.name}(${obj.id}) - ${obj.belong}`
    },
    mounted () {
      document.forms[0].subject.focus()
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .project-create{width:400px;margin:0 auto;}
  .fields{position:relative;}
  .search-wrap{border:1px solid #bebebe;
    input[type="text"]{border:none;}
  }
  .search-list{position:absolute;left:0;right:0;z-index:20;background:#fff;border:1px solid #bebebe;padding:20px;border-bottom:2px solid $color1;background:#f5f5f5;
    p{padding:5px 0;}
  }
  .selected-list{padding:10px;border-top:1px dotted #ddd;
    p{float:left;background:fade-out($color1, .85);border-radius:3px;font-size:11px;padding:0 7px;line-height:20px;margin-right:5px;}
    span{display:inline-block;vertical-align:middle;margin-right:5px;}
    i{margin-top:0px;color:fade-out(#000, .8)}
  }
</style>
