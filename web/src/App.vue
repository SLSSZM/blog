<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import HeaderBar from '@/views/layout/HeaderBar.vue';
  import AsideBar from './views/layout/AsideBar.vue';
  import { useThemeStore } from './store/theme';
  import { useRoute, useRouter } from 'vue-router';
  import { useConfigStore } from './store/config';
  import { fetchConfigApi } from './network/api';

  const themeStore = useThemeStore();
  const configState = useConfigStore();

  let htmlRef = ref<HTMLElement | null>(null);
  let show = ref<boolean>(false);
  // 显示侧边栏
  const showAside = (closed?: boolean): void => {
    if (closed) {
      show.value = false;
      htmlRef.value!.style.overflow = 'auto';
      return;
    }
    show.value = true;
    htmlRef.value!.style.overflow = 'hidden';
  };

  const router = useRouter();
  const route = useRoute();
  // 返回顶部
  const handlerBackTop = (): void => {
    router.push({ name: route.name as string, query: { ...route.query } });
  };

  onMounted(async (): Promise<void> => {
    htmlRef.value = document.documentElement;
    // 初始化主题
    themeStore.init();

    // 监听滚动
    document.addEventListener('scroll', () => {
      configState.setScroll();
    });

    // 获取配置数据
    const seeWeb = sessionStorage.getItem('seeWeb');
    const res = await fetchConfigApi({ addView: !seeWeb });
    configState.setConfigData(res.data);
    if (!seeWeb) {
      sessionStorage.setItem('seeWeb', 'true');
    }
  });

  router.beforeResolve((to, from, next) => {
    configState.initScroll();
    next();
  });
</script>

<template>
  <div :class="['page']">
    <header-bar class="header-bar" @open-aside="showAside" />
    <aside-bar :show="show" @close="showAside(true)" />
    <div class="mockAside" v-if="show" @click="showAside(true)"></div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="back-top" v-if="configState.scrollTop > 200" @click="handlerBackTop"></div>
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
    .back-top {
      height: 50px;
      width: 50px;
      position: fixed;
      border-radius: 50%;
      cursor: pointer;
      right: 5%;
      bottom: 5%;
      opacity: 0.5;
      background-image: url('@/assets/images/backTop.svg');
      background-position: center;
      background-size: cover;
      background-color: var(--bgc);
      &:hover {
        opacity: 0.8;
      }
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
