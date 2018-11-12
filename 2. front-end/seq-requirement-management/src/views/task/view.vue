<template>
  <section class="card-view">
    <h3 class="content-title">요구사항 카드 상세 조회</h3>
    <div class="card-wrap">
      <header class="card-title">
        <span :class="`color-label color${card.state + 1}`" />
        <span class="category-name" v-html="`[${card.category_name}]`" />
        <span class="card-name" v-html="card.title" />
        <span class="reg-date">
          <i class="far fa-calendar-alt"></i>
          {{getDateFormat(card.reg_date)}}
        </span>
      </header>
      <div class="card-content">
        <p>
          <span class="writer">
            <i class="fas fa-edit"></i>
            {{card.writer_name}}
          </span>
        </p>
        <div v-html="(card.content+'').replace(/\n/gi, '<br />')" />
      </div>
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
      <Issue></Issue>
    </div>
    <div class="btn-group">
      <router-link :to="`/project/view/${card.project_writer}/${card.project_uri}`" class="btn default">목록으로</router-link>
      <router-link :to="`/card/update/${card.idx}`" class="btn submit">수정하기</router-link>
      <router-link :to="`/card/delete/${card.idx}`" class="btn submit">삭제하기</router-link>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    components: {
      Issue: () => import(`@/components/card/issue.vue`)
    },
    computed: {
      card () {
        return this.$store.state.cardNow
      }
    },
    created () {
      Api.getCard(this.$route.params.idx).then(res => {
        this.$store.commit('setState', ['cardNow', res.rows[0]])
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .card-wrap{background:$color-grey;border:1px solid #ddd;border-radius:3px;padding:30px;
    >*{background:#fff;border:1px solid #ddd;border-radius:3px;padding:15px;
      +*{margin-top:10px;}
    }
  }
  .card-title{font-size:21px;position:relative;font-weight:normal;
    .color-label:before{width:16px;height:16px;margin-top:-2px}
  }
  .reg-date{font-size:13px;display:block;color:#666;float:right;line-height:60px;position:absolute;right:15px;top:0;bottom:0;
    i{margin-top:-3px;}
  }
  .category-name{color:#aaa;display:inline-block;margin-right:5px}
  .card-content{
    >div{margin-top:15px;line-height:160%;}
  }
  .writer{
    i{margin-top:-3px;}
  }
  .card-bottom{
    p{line-height:200%;}
    .lbl{color:$color1;display:inline-block;width:80px;margin-right:10px;position:relative;
      &:after{content:"";display:inline-block;width:1px;background:#aaa;vertical-align:middle;position:absolute;right:15px;top:10px;bottom:10px;}
    }
  }
</style>