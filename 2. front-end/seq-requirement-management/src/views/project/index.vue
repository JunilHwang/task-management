<template>
  <div class="wrap">
    <site-header></site-header>
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
  import Header from '@/components/header.vue'
  import Footer from '@/components/footer.vue'
  export default {
    components: {
      'site-header': Header,
      'site-footer': Footer
    }
  }
</script>
