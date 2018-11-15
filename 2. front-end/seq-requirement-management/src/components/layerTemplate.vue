<template>
  <div class="layer">
    <span class="middle"></span><div>
      <a href="#" class="close" @click.prevent="close">X</a>
      <component :is="layerContent" :send="send" />
    </div>    
  </div>
</template>

<script>
  import category from './category'
  import login from './login'
  import project_create from './project/create'
  import project_access from './project/access'
  import github_repository from './openapi/git-repo-add'
  export default {
    props: ['layerContent', 'send'],
    components: {
      category, login, project_create, project_access, github_repository
    },
    methods: {
      close () {
        this.$store.commit('closeLayer')
      }
    }
  }  
</script>
