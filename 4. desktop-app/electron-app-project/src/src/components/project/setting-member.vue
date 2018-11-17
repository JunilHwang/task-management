<template>
  <section class="setting-member">
    <div class="setting-container">
      <header class="setting-title">
        <h3>프로젝트 참여인원</h3>
        <span>Member List</span>
      </header>
      <ul v-if="memberList.length">
        <li v-for="(member, key) in memberList" :key="key">
          <span class="image" :style="{backgroundImage: `url(${member.photo_src})`}" />
          <div class="info">
            <p class="name" v-html="member.name" />
            <p class="email" v-html="member.email" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  import Api from '@/middleware/Api.js'
  export default {
    async created () {
      const data = await this.getApiData(Api.getMemberOnProject(this.projectData.pidx))
      this.memberList = data.member
    },
    data () {
      return {
        memberList: []
      }
    },
    props: ['projectData']
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  ul{margin-bottom:10px;}
  li{border:1px solid #bebebe;border-radius:3px;padding:10px;display:flex;align-items:center;justify-content:center;
    +li{margin-top:5px;}
  }
  .image{width:50px;height:50px;background:no-repeat center / cover;margin-right:10px;}
  .info{text-align:left;}
  .name{font-size:17px;}
  .email{font-size:13px;color:#666;}
</style>
