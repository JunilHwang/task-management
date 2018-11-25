<template>
  <footer class="footer">
    Copyright &copy; 2018 DKU.SW.SEQ All Right Reserved
  </footer>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .footer{text-align:center;border-top:1px solid #ddd;background:#444;color:#fff;padding:40px 0;font-size:17px;font-weight:100;text-transform:uppercase;position:relative;z-index:10}
  @include tablet () {
    .footer{padding:20px 0;}
  }
  @include mobile () {
    .footer{font-size:13px;}
  }
</style>
