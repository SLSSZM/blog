<script setup lang="ts">
  import { useThemeStore } from '@/store/theme';
  import { onMounted, provide, readonly, ref } from 'vue';

  const store = useThemeStore();
  // 初始化主题
  store.init();

  // 设置响应式（一共3级，1 pc；2 ipad；3：phone）
  let clientLevel = ref<number>(1);
  provide('clientLevel', readonly(clientLevel));
  const changeLevel = (): void => {
    const width = document.documentElement.clientWidth;
    width > 1200 && (clientLevel.value = 1);
    width <= 1200 && (clientLevel.value = 2);
    width <= 600 && (clientLevel.value = 3);
  };
  changeLevel();
  onMounted(() => {
    window.addEventListener('resize', changeLevel);
  });
</script>

<template>
  <router-view />
</template>

<style lang="scss">
  @import '@/assets/scss/index.scss';
</style>
