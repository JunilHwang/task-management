<template>
  <div class="commits" v-if="commits.length">
    <header class="commit-header">
      <strong>관련 커밋 {{commits.length}}</strong>
    </header>
    <ul>
      <li v-for="(commit, key) in commits" :key="key">
        <span class="image" :style="{backgroundImage: `url(${commit.image})`}" />
        <span class="author" v-html="commit.name" />
        <span class="message">
          <a :href="commit.html_url" v-html="commit.message" target="_blank" />
        </span>
        <span class="register_date" v-html="getFlowDate(commit.register_date)" />
        <a href="#" @click.prevent="commitDelete(commit.sha)" class="close"><i class="fas fa-times-circle"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    props: ['commits'],
    methods: {
      async commitDelete (sha) {
        if (!confirm('정말로 삭제하시겠습니까?')) return
        const tidx = this.$route.params.tidx
        await this.getApiData(Api.deleteCommitOnTask(tidx, sha))
        this.$parent.load()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .commit-header{margin-bottom:10px;}
  li{background:#fff;border:1px solid #ddd;padding:10px;border-radius:3px;font-size:13px;position:relative;
    +li{margin-top:3px;}
    span{display:inline-block;vertical-align:middle;}
    .plug{position:absolute;right:10px;font-size:20px;opacity:0.3;transition:0.3s;top:0;bottom:0;display:flex;align-items:center;text-decoration:none;}
    &:hover{border-color:#000;
      .close{opacity:1;}
    }
    &.active{border-color:#000;
      .plug{opacity:1;}
    }
  }
  .image{width:15px;height:15px;background:no-repeat center / cover;margin-right:5px;}
  .author{width:100px;}
  .register_date{float:right;color:#666;margin-right:20px;}
  .close{position:absolute;right:-12px;top:-12px;font-size:24px;z-index:10;opacity:0;transition:.5s;width:24px;height:24px;background:#fff;border-radius:12px;}
</style>