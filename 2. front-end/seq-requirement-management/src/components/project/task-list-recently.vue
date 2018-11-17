<template>
  <section>
    <h4 class="section-title">업데이트/생성 테스크 Top 10</h4>
    <div class="section-content">
      <template v-if="taskList.length">
      <ul class="float-wrap">
        <li v-for="(task, key) in taskList" :key="key">
          <taskCard :task="task" />
        </li>
      </ul>
      </template>
      <p class="none" v-else>이슈 목록이 없습니다.</p>
    </div>
  </section>
</template>

<script>
  import taskCard from '@/components/task/card'
  export default {
    props: ['taskList'],
    components: { taskCard }
  }
</script>

<style lang="scss" scoped>
  li{width:calc(50% - 5px);float:left;margin-bottom:10px;
    &:nth-child(2n){margin-left:10px;}
  }
</style>
