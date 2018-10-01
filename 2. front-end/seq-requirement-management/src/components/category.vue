<template>
  <div class="category">
    <h3 class="layer-title">카테고리 관리</h3>
    <div class="category-list" v-if="nowPage === 'category-list'">
      <ul v-if="categoryList.length">
        <li v-for="(category, key) in categoryList" :key="key">
          <div>
            <strong>{{category.title}}</strong>
            <strong>
              <a href="#" @click.prevent="categoryUpdateView(category.idx)"><i class="far fa-edit"></i></a>
              <a href="#" @click.prevent="categoryDelete(category.idx)"><i class="fas fa-times"></i></a>
            </strong>
          </div>
        </li>
      </ul>
      <p v-else>
        추가된 카테고리가 없습니다. 카테고리를 추가해주세요
      </p>
      <div class="btn-group right btm">
        <a href="#" class="btn submit" @click.prevent="categoryInsertView">추가</a>
      </div>
    </div>
    <div class="category-append" v-else-if="nowPage === 'category-append'">
      <form action="" method="post" @submit="categoryInsert">
        <ul class="fields">
          <li>
            <label class="input-label">
              <span class="pre"><i class="far fa-edit"></i></span>
              <input type="text" name="title" class="full-width" autofocus required>
              <span class="lbl">카테고리 타이틀을 입력해주세요</span>
            </label>
          </li>
          <li>
            <button type="submit" class="btn btn-full submit">전송</button>
          </li>
          <li>
            <button type="button" class="btn btn-full default" @click.prevent="nowPage = 'category-list'">취소</button>
          </li>
        </ul>
      </form>
    </div>
    <div class="category-update" v-else-if="nowPage === 'category-update'">
      <form action="" method="post" @submit="categoryUpdate">
        <ul class="fields">
          <li>
            <label class="input-label">
              <span class="pre"><i class="far fa-edit"></i></span>
              <input type="text" name="title" class="full-width" autofocus :value="nowData.title" required>
              <span class="lbl">카테고리 타이틀을 입력해주세요</span>
            </label>
          </li>
          <li>
            <button type="submit" class="btn btn-full submit">전송</button>
          </li>
          <li>
            <button type="button" class="btn btn-full default" @click="nowPage = 'category-list'">취소</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
  import Api from '@/middleware/Api.js'
  export default {
    data () {
      return {
        nowPage: 'category-list',
        nowData: {}
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      }
    },
    methods: {
      categoryInsert (e) {
        Api.postCategory({idx: this.send.pidx, title: e.target.title.value}).then(() => {
          alert('추가되었습니다')
          this.nowPage = 'category-list'
          this.setCategoryList()
        })
      },
      categoryInsertView () {
        this.nowPage = 'category-append'
      },
      async categoryUpdateView (idx) {
        this.nowData = (await Api.getCategory(idx)).rows[0]
        this.nowPage = 'category-update'
      },
      categoryDelete (idx) {
        if (!confirm('정말로 삭제하시겠습니까?')) return
        Api.deleteCategory(idx).then(() => {
          alert('삭제되었습니다')
          this.nowPage = 'category-list'
          this.setCategoryList()
        })
      },
      categoryUpdate (e) {
        Api.putCategory({idx: this.nowData.idx, title: e.target.title.value}).then(() => {
          alert('수정되었습니다')
          this.nowPage = 'category-list'
          this.nowData = {}
          this.setCategoryList()
        })
      },
      setCategoryList () {
        Api.getCategoryList(this.send.pidx).then(() => {
          this.$store.commit('setCategoryList', res.rows)
        })
      }
    },
    props: ['send'],
  }  
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .category{width:400px;}
  .category-list{
    ul:after{content:"";display:block;clear:both;}
    li{float:left;width:33.333%;
      div{display:flex;background:fade-out($color1, .85);border-radius:3px;font-size:11px;padding:3px 7px;line-height:20px;margin:5px;justify-content:space-between;align-items:center;}
      strong{font-weight:normal;}
      a{display:inline-block;vertical-align:middle;margin-left:5px;margin-top:-4px;opacity:0.5;transition:.3s;
        &:hover{opacity:1;}
      }
    }
  }
</style>
