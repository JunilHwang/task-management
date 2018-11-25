<template>
  <section>
    <h4 class="section-title">업데이트/생성 테스크 Top 10</h4>
    <div class="section-content" v-if="loading">
      <template v-if="taskList.length">
      <ul class="float-wrap">
        <li v-for="(task, key) in taskList" :key="key">
          <taskCard :task="task" />
        </li>
      </ul>
      </template>
      <p class="none" v-else>이슈 목록이 없습니다.</p>
    </div>
    <CustomLoading :loading="loading" />
  </section>
</template>

<script>
  import taskCard from '@/components/task/card'
  import CustomLoading from '@/components/loading'

  export default {
    components: { taskCard, CustomLoading },
    props: ['taskList', 'loading']
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  li{width:calc(50% - 5px);float:left;margin-bottom:10px;
    &:nth-child(2n){margin-left:10px;}
  }
  @include mobile () {
    li{width:auto;float:none;margin-bottom:10px;
      &:nth-child(2n){margin-left:0;}
    }    
  }
</style>
