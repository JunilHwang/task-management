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
  export default {
    props: ['layerContent', 'send'],
    components: {
      category, login
    },
    methods: {
      close () {
        this.$store.commit('closeLayer')
      }
    }
  }  
</script>
