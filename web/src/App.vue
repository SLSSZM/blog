<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import HeaderBar from '@/views/layout/HeaderBar.vue';
  import AsideBar from './views/layout/AsideBar.vue';
  import { useScrollLock } from '@vueuse/core';
  import { ThemeType, useThemeStore } from './store/theme';
  import { useRoute, useRouter } from 'vue-router';

  const themeStore = useThemeStore();
  let show = ref<boolean>(false);
  let htmlRef = ref<HTMLElement | null>(null);
  let isLocked = ref<boolean>(false);

  // 当前滚动高度
  let currentScrollDistance = ref<number>(0);
  const scroll = (): void => {
    const distance: number = document.documentElement.scrollTop || document.body.scrollTop;

    currentScrollDistance.value = distance;
  };
  onMounted((): void => {
    themeStore.init();
    htmlRef.value = document.documentElement;
    isLocked = useScrollLock(htmlRef);

    document.addEventListener('scroll', e => {
      scroll();
    });
  });

  const showAside = (closed?: boolean): void => {
    if (closed) {
      show.value = false;
      isLocked.value = false;
      return;
    }
    show.value = true;
    isLocked.value = true;
  };
  const router = useRouter();
  const route = useRoute();
  const handlerBackTop = (): void => {
    router.push({ name: route.name as string, query: { ...route.query } });
  };
</script>

<template>
  <div :class="['page']">
    <header-bar class="header-bar" @open-aside="showAside" />
    <aside-bar :show="show" @close="showAside(true)" />
    <div class="mockAside" v-if="show" @click="showAside(true)"></div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="backTop" v-show="currentScrollDistance > 200" @click="handlerBackTop"></div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    color: var(--fc);
    background-color: var(--bg);
    letter-spacing: 1px;
    .header-bar {
      position: fixed;
      z-index: 5;
    }
    .container {
      width: 60%;
      max-width: 1200px;
      margin-top: 70px;
      overflow: hidden;
    }
    .mockAside {
      position: fixed;
      background-color: rgba(0, 0, 0, 0.602);
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: 9;
    }
    .backTop {
      height: 50px;
      width: 50px;
      position: fixed;
      cursor: pointer;
      right: 5%;
      bottom: 5%;
      background-image: url('@/assets/images/backTop.svg');
      background-position: center;
      background-size: cover;
    }
  }
  @media screen and (max-width: 1200px) {
    .page {
      background-color: var(--bgc);
      .container {
        width: 90% !important;
        max-width: 600px !important;
      }
    }
  }
</style>
