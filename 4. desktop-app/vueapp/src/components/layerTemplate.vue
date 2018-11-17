<template>
  <div class="layer" v-if="$store.state.layerState !== false">
    <span class="middle"></span><div>
      <a href="#" class="close" @click.prevent="close">X</a>
      <component :is="$store.state.layerState" />
    </div>    
  </div>
</template>

<script>
  import login from './member/login'
  import projectCreate from './project/create'
  import projectAccess from './project/access'
  import githubRepository from './openapi/github-select'
  import taskCreate from './task/create'
  import taskUpdate from './task/update'
  export default {
    components: {
      login,
      projectCreate,
      projectAccess,
      githubRepository,
      taskCreate,
      taskUpdate
    },
    methods: {
      close () { this.$store.commit('closeLayer') }
    }
  }  
</script>
