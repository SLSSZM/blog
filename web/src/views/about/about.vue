<script setup lang="ts">
  import VMdEditor from '@/components/common/v-md-editor/VMdEditor.vue';
  import { onMounted, ref } from 'vue';
  import Chunk from '@/components/chunk/Chunk.vue';

  let about = ref<string>('');
  onMounted(async (): Promise<void> => {
    const res = JSON.parse(localStorage.getItem('CONFIG') || '[]');
    about.value = res?.configs?.description || '';
  });
</script>
<template>
  <chunk color class="chunk">
    <v-md-editor :value="about" />
  </chunk>
</template>

<style scoped lang="scss">
  .chunk {
    margin-top: 30px;
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
