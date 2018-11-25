<template>
  <div class="wrap">
    <siteHeader />
    <div class="site-content">
      <div class="container">
        <div class="container-inner">
          <router-view v-if="$store.state.member" />
          <template v-else>
            <div class="main-login-wrap">
              <memberLogin />              
            </div>
          </template>
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
  import memberLogin from '@/components/member/login'
  export default {
    components: { siteHeader, siteFooter, layerTemplate, memberLogin }
  }
</script>

<style lang="scss">
@import "@/assets/scss/_lib.scss";
.main-login-wrap{width:250px;margin:0 auto;background:#fff;padding:20px;border:1px solid #bebebe;border-radius:3px;
  .layer-title{font-size:21px;margin-bottom:10px;text-align:center;}
}
@include mobile () {
  .main-login-wrap{max-width:250px;width:auto;}
}
</style>