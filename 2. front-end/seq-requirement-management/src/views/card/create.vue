<template>
  <section>
    <div class="requirement-create">
    <h3 class="requirement-title">요구사항 카드 추가</h3>
      <form action="" method="post" @submit="requirementCreate">
        <fieldset><legend>요구사항 카드 추가</legend>
          <ul class="fields">
            <li>
              <label class="input-label">
                <select name="category" class="full-width" required>
                  <option value="">카테고리 선택</option>
                  <option v-for="(c, key) in categoryList" :value="c.idx" :key="key" v-html="c.title" />
                </select>
              </label>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-file-signature"></i></span>
                <input type="text" name="title" class="full-width" required>
                <span class="lbl">제목</span>
              </label>
            </li>
            <li class="datepicker">
              <div class="input-label">
                <span class="pre"><i class="far fa-calendar-alt"></i></span>
                <Datepicker format="yyyy-MM-dd" placeholder="기한일 선택" name="date" class="full-width" required></Datepicker>
              </div>
            </li>
            <li>
              <label class="input-label">
                <span class="pre"><i class="fas fa-align-left"></i></span>
                <textarea type="text" name="content" class="full-width" cols="80" rows="10" required></textarea>
                <span class="lbl">간략 설명</span>
              </label>
            </li>
            <li>
              <button type="submit" class="btn btn-full submit">작성완료</button>
            </li>
            <li>
              <router-link to="/project" type="submit" class="btn btn-full default">목록으로</router-link>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
  import Api from '@/middleware/Api.js'
  import Datepicker from 'vuejs-datepicker';
  export default {
    components: {
      Datepicker
    },
    computed: {
        categoryList () { return this.$store.state.categoryList }
    },
    methods: {
      requirementCreate (e) {
        const frm = e.target
        const data = {
          category: frm.category.value,
          title: frm.title.value,
          reg_date: +new Date(),
          com_date: +new Date(frm.date.value),
          content: frm.content.value,
          pidx: this.$route.params.pidx,
          writer: this.$store.state.member.idx
        }
        Api.postCard(data).then(() => {
          const params = this.$route.params
          const store = this.$store
          Api.getCardList(store.state.pidx, store.state.selectedCategory).then(res => {
            store.commit('setState', ['cardList', res.rows])
            alert('추가되었습니다.')
            this.$router.push(`/project/view/${params.id}/${params.uri}`)
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/_lib.scss";
  .requirement-create{width:700px;margin:0 auto;background:#fff;padding:30px;border:1px solid #ddd;border-radius:3px;}
  .full-width input{width:100% !important}
</style>