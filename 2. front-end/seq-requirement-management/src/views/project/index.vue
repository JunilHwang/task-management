<template>
  <div class="wrap">
    <siteHeader />
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <siteFooter />
    <layerTemplate />
  </div>
</template>

<script>
  import siteHeader from '@/components/header'
  import siteFooter from '@/components/footer'
  import layerTemplate from '@/components/layerTemplate'
  export default {
    components: { siteHeader, siteFooter, layerTemplate }
  }
</script>
