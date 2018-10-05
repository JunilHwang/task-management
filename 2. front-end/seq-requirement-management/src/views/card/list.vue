<template>
  <section class="card-list">
    <div class="list-header float-wrap">
      <p class="cnt">{{cardList.length}}개의 요구사항 카드가 있습니다.</p>
      <div class="color-description">
        <span class="color-label color1"> 
          <span>진행중</span>
        </span>
        <span class="color-label color2"> 
          <span>구현완료</span>
        </span>
        <span class="color-label color3"> 
          <span>테스트 완료</span>
        </span>
        <span class="color-label color4"> 
          <span>이슈 발생</span>
        </span>
      </div>
    </div>
    <ul v-if="cardList.length" class="float-wrap">
      <li v-for="(card, key) in cardList" :key="key">
        <dl>
          <dt class="title">
            <span :class="`color-label color${card.state + 1}`" />
            <span class="category-name" v-html="`[${card.category_name}]`" />
            <span class="card-name" v-html="card.title" />
            <span class="reg-date">
              <i class="far fa-calendar-alt"></i>
              {{getDateFormat(card.reg_date)}}
            </span>
          </dt>
          <dd>
            <p>
              <span class="writer">
                <i class="fas fa-edit"></i>
                {{card.writer_name}}
              </span>
            </p>
            <div class="list-content" v-html="contentPreview(card.content, 200)" />
            <div class="card-bottom">
              <p>
                <strong class="lbl">기한</strong>
                <span v-html="getDateFormat(card.com_date).substring(0, 10)" />
              </p>
              <p>
                <strong class="lbl">담당자</strong>
                <span>{{card.members ? card.members : '아직 담당자가 없습니다'}}</span>
              </p>
            </div>
          </dd>
        </dl>
      </li>
    </ul>
    <p class="none" v-else>추가된 카드가 없습니다. 카드를 추가해주세요</p>
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
    dl{border-radius:3px;border:1px solid #ddd;background:#fff;margin:5px;padding:20px;height:200px;box-shadow:0 0 10px fade-out(#aaa, .7);transition:.3s;cursor:pointer;position:relative;
      &:hover{box-shadow:0 0 10px fade-out(#aaa, .3)}
    }
    .none{padding:20px;}
    .title{border-bottom:1px solid #ddd;margin-bottom:10px;padding-bottom:10px;font-size:15px;letter-spacing:-1px;}
    .category-name{color:#aaa;display:inline-block;margin-right:5px}
    .writer{display:inline-block;font-size:13px;
      i{margin-top:-4px;}
    }
    .reg-date{float:right;margin-left:10px;font-size:11px;color:#666;margin-top:3px;
      i{margin-top:-3px;margin-right:5px;}
    }
    .card-bottom{position:absolute;bottom:20px;left:20px;font-size:13px;
      p+p{margin-top:5px;}
      strong{color:$color1;display:inline-block;width:50px;font-weight:normal}
    }
  }
  .list-content{margin:10px 0;word-break:break-all;}
  .list-header{background:#fff;border:1px solid #ddd;margin:5px;padding:10px;}
  .cnt{float:left;}
  .color-description{float:right;
    >span+span{margin-left:10px;}
  }
  .color-label{display:inline-block;margin-right:5px;
    &:before{content:"";width:10px;height:10px;display:inline-block;vertical-align:middle;border-radius:3px;}
    &.color1:before{background:#f4f48a}
    &.color2:before{background:#008672}
    &.color3:before{background:#a2eeef}
    &.color4:before{background:#d73a4a}
    span{display:inline-block;vertical-align:middle;margin-left:5px;}
  }
</style>