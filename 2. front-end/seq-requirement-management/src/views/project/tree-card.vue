<template>
  <ul :class="`step${step + 1} ${max === step ? 'last' : ''}`">
    <li v-for="(temp, key, index) in tree" :key="index" :class="{last: !emptyCheck(temp.children), first: step === 0}">
      <span class="line before" v-if="step > 0"></span>
      <span class="line after" v-if="step > 0"></span>
      <div :class="`color${temp.data.state + 1}`" @click="previewTask(temp.data)">
        {{temp.data.title}}
      </div>
      <taskTreeCard v-if="emptyCheck(temp.children)" :tree="temp.children" :step="step + 1" :max="max" />
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
      },
      emptyCheck (obj) {
        let cnt = 0
        Object.keys(obj).map(() => {
          cnt++
        })
        return cnt
      }
    },
    props: ['tree', 'step', 'max', 'parent']
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .step1{width:100%;
    >li{padding:50px;border:1px solid #fff;border-radius:20px;margin-bottom:20px;
      +li{margin-left:10px;}
      >div{padding:20px;}
    }
  }
  ul:not(.step1){text-overflow: ellipsis;white-space: nowrap;}
  li{display:inline-block;vertical-align:top;text-align:center;position:relative;
    &>div:before,
    &>div:after{content:"";height:7px;width:1px;display:block;background:#fff;position:absolute;left:50%;}
    &>div:before{bottom:100%;}
    &>div:after{top:100%;}
    &.last>div:after{content:none;}
    &.first>div:before{content:none;}
    &:first-child>.line.before{display:none;}
    &:last-child>.line.after{display:none;}
  }
  div{background:#fff;padding:5px;border-radius:10px;display:inline-block;margin:7px;cursor:pointer;box-sizing:border-box;transition:.3s;position:relative;
    &:hover{background:#fff;}
  }
  .color1{background:#ffa;}
  .color2{background:#aee;}
  .color3{background:#faa;}
  .line{position:absolute;display:block;height:1px;width:50%;left:0;background:#fff;
    &.before{left:0;}
    &.after{left:50%;}
  }
  @include mobile () {
    .step1{text-align:left;
      >li{padding:20px;margin:10px;
        +li{margin-left:10px;}
        >div{padding:10px;}
      }
    }
    li{font-size:11px;}
  }
</style>