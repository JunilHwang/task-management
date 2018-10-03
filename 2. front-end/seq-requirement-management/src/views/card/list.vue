<template>
  <section class="card-list">
    <ul v-if="cardList.length" class="float-wrap">
      <li v-for="(card, key) in cardList" :key="key">
        <dl>
          <dt class="title">
            <span class="category-name" v-html="`[${card.category_name}]`" />
            <span class="card-name" v-html="card.title" />
            <span class="reg-date" v-html="getDateFormat(card.reg_date)" />
          </dt>
          <dd>
            <p>
              <span class="writer" v-html="card.writer_name" />
            </p>
            <p class="com-date">
              <span v-html="getDateFormat(card.com_date).substring(0, 10)" />
            </p>
          </dd>
        </dl>
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
    li{width:50%;float:left;}
    dl{border-radius:3px;border:1px solid #ddd;background:#fff;margin:5px;padding:20px;height:150px;box-shadow:0 0 10px fade-out(#aaa, .7);transition:.3s;cursor:pointer;
      &:hover{box-shadow:0 0 10px fade-out(#aaa, .3)}
    }
    .title{border-bottom:1px solid #ddd;margin-bottom:10px;padding-bottom:10px;font-size:15px;letter-spacing:-1px;}
    .category-name{color:#aaa;display:inline-block;margin-right:5px}
    .writer{display:inline-block;}
    .reg-date{float:right;margin-left:10px;font-size:11px;color:#666;margin-top:3px}
  }
</style>