<template>
  <section class="comment-wrap">
    <commentList />
    <commentWrite />
  </section>
</template>

<script>
  export default {
    components: {
      commentList: () => import('./list.vue'),
      commentWrite: () => import('./write.vue')
    }
  }
</script>
