<template>
  <div class="wrap">
    <site-header />
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <site-footer />
    <layer-list />
  </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import Footer from '@/components/footer.vue'
  import LayerList from '@/components/layerList.vue'
  export default {
    components: {
      'site-header': Header,
      'site-footer': Footer,
      'layer-list': LayerList,
    }
  }
</script>
