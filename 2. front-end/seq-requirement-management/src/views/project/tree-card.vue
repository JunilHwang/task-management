<template>
  <ul :class="`step${step + 1}`">
    <li v-for="(temp, key) in tree" :key="key">
      <div :class="`color${temp.data.state + 1}`" @click="previewTask(temp.data)">
        {{temp.data.title}}
      </div>
      <taskTreeCard v-if="step < max" :tree="temp.children" :step="step + 1" :max="max" />
    </li>
  </ul>
</template>

<script>
  import taskTreeCard from './tree-card'
  export default {
    name: 'taskTreeCard',
    components: {
      taskTreeCard
    },
    methods: {
      previewTask (task) {
        this.$store.commit('setState', ['nowTask', task])
        this.$store.commit('openLayer', 'taskMiniView')
      }
    },
    props: ['tree', 'step', 'max', 'parent']
  }
</script>

<style lang="scss" scoped>
  .step1{width:100%;
    >li{padding:50px;border:1px solid #fff;border-radius:20px;margin-bottom:20px;
      +li{margin-left:10px;}
      >div{padding:20px;}
    }
  }
  ul:not(.step1){text-overflow: ellipsis;white-space: nowrap;}
  li{display:inline-block;vertical-align:top;text-align:center;}
  div{background:#fff;padding:5px;border-radius:10px;display:inline-block;margin:5px;cursor:pointer;box-sizing:border-box;transition:.3s;
    &:hover{background:#fff;}
  }
  .color1{background:#ffa;}
  .color2{background:#aee;}
  .color3{background:#faa;}
</style>