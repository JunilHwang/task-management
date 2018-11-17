<template>
  <div class="loading-wrap" v-if="!loading">
    <Circle10 :style="{width: `${customSize}px`, height: `${customSize}px`, transform: `scale(${ratio})`}" />
  </div>
</template>

<script>
  import { Circle10 } from 'vue-loading-spinner'

  export default {
    components: {
      Circle10
    },
    created () {
      const origin = this.customSize
      const size = this.size || origin
      this.ratio = size / origin
      this.customSize = size
    },
    data () {
      return {
        ratio: 1,
        customSize: 40
      }
    },
    props: ['loading', 'size']
  }  
</script>

<style lang="scss" scoped>
  .loading-wrap{display:flex;justify-content:center;margin:10px 0;align-items:center;}
</style>