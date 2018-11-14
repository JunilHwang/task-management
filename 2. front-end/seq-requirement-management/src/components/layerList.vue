<template>
  <div>
    <layerTemplate v-if="$store.state.layerState === 'loginPopup'" layerContent="login"></layerTemplate>
    <layerTemplate v-if="$store.state.layerState === 'projectPopup'" layerContent="project_create"></layerTemplate>
    <layerTemplate v-if="$store.state.layerState === 'projectAccess'" layerContent="project_access"></layerTemplate>
    <layerTemplate v-if="$store.state.layerState === 'github_repository'" layerContent="github_repository"></layerTemplate>
  </div>
</template>

<script>
  import layerTemplate from '@/components/layerTemplate'
  export default {
    components: { layerTemplate },
  }
</script>