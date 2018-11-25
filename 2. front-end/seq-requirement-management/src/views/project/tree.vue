<template>
  <section class="task-tree">
    <a href="#" class="close" @click="$parent.treeOpen = false">X</a>
    <span class="middle"></span>
    <taskTreeCard :tree="tree[0].children" :step="0" :max="max" :parent="0" />
  </section>
</template>

<script>
  import taskTreeCard from './tree-card'

  export default {
    components: { taskTreeCard },
    created () {
      const taskList = this.$store.state.taskList
      const depthArr = []
      taskList.forEach(v => {
        if (depthArr[v.depth] === undefined)
          depthArr[v.depth] = []
        depthArr[v.depth].push(v)
      })
      const tree = { '0': { children: {} } }
      const len = depthArr.length

      const getTree = (obj, step = 0, parent = 0) => {
        if (step < len) depthArr[step].forEach(v => {
          if (v.parent === parent) {
            obj[parent].children[v.tidx] = {
              children: {},
              data: v
            }
            const temp = obj[v.parent].children
            getTree(temp, step + 1, v.tidx)
          }
        })
      }

      getTree(tree)
      this.tree = tree
      this.max = len
    },
    data () {
      return {
        tree: {},
        max: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_lib.scss";
  .task-tree{position:fixed;left:0;right:0;top:0;bottom:0;background:fade-out(#000, 0.5);z-index:100;overflow:auto;text-align:center;}
  a.close{position:absolute;right:0;top:0;background:#09F;display:block;text-decoration:none;color:#fff;padding:5px 10px;opacity:0.5;
    &:hover{opacity:1;}
  }
  @include mobile () {
    .task-tree{top:50px;}
  }
</style>
