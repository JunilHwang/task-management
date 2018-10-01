<template>
  <section>
    <ul v-if="cardList.length">
      <li>
        
      </li>
    </ul>
    <p v-else>추가된 카드가 없습니다. 카드를 추가해주세요</p>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        cardList: []
      }
    },
    created () {

    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .requirement-create{width:700px;margin:0 auto;background:#fff;padding:30px;border:1px solid #ddd;border-radius:3px;}
  .full-width input{width:100% !important}
</style>