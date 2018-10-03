<template>
  <section class="card-list">
    <ul v-if="cardList.length">
      <li v-for="(card, key) in cardList" :key="key">
        <div>
          <strong class="title" v-html="card.title" />

        </div>
      </li>
    </ul>
    <p v-else>추가된 카드가 없습니다. 카드를 추가해주세요</p>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    computed: {
      selectedCategory () {
        return this.$store.state.selectedCategory
      },
      pidx () {
        return this.$store.state.pidx
      },
      cardList () {
        return this.$store.state.cardList
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .card-list{
    ul{display:flex;}
    li{border-radius:3px;border:1px solid #ddd;background:#fff;padding:20px;width:25%}
  }
</style>