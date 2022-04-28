<script setup lang="ts">
  import VMdEditor from '@/components/common/v-md-editor/VMdEditor.vue';
  import Chunk from '@/components/chunk/Chunk.vue';
  import { useConfigStore } from '@/store/config';

  const configState = useConfigStore();
</script>
<template>
  <chunk color class="chunk">
    <v-md-editor :value="configState.configData.configs.description" />
  </chunk>
</template>

<style scoped lang="scss">
  .chunk {
    margin-top: 30px;
    padding: 10px;
  }
  @media screen and (max-width: 1200px) {
    .header {
      height: 25px;
    }
  }
  @media screen and (max-width: 750px) {
    .header {
      height: 20px;
    }
  }
</style>
