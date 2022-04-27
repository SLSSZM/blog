<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useThemeStore, ThemeType } from '@/store/theme';
  import { useRoute, useRouter } from 'vue-router';
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import { useConfigStore } from '@/store/config';

  const themeStore = useThemeStore();
  // header高度
  let height = ref<string>('65px');
  // 当前滚动高度
  let currentScrollDistance = 0;
  let move = ref<boolean>(false);

  // 检测滚动
  const scroll = (): void => {
    const distance: number = document.documentElement.scrollTop || document.body.scrollTop;
    if (distance > currentScrollDistance && !move.value) {
      if (distance > 120) {
        height.value = '0px';
      }
    } else {
      height.value = '65px';
    }
    currentScrollDistance = distance;
  };
  const configState = useConfigStore();
  onMounted(() => {
    document.addEventListener('scroll', () => {
      scroll();
    });
  });
  const router = useRouter();
  const route = useRoute();
  const dumpPage = (path: string): void => {
    router.push(path);
  };
  const emits = defineEmits<{
    (e: 'openAside'): void;
  }>();
  const dumpGithub = (): void => {
    window.open(configState.configData.configs.githubPath);
  };
</script>

<template>
  <div :class="['header-bar']">
    <div class="logo">
      <h1 class="flex-c">
        <span class="text hover fct" @click="dumpPage('/home')">
          <span class="letter">山岚设</span>色
        </span>
      </h1>
    </div>
    <div class="menu flex-c">
      <div
        class="item hover"
        @click="dumpPage('/home')"
        :class="route.path === '/home' && 'active'"
      >
        首页
      </div>
      <div
        class="item hover"
        @click="dumpPage('/article')"
        :class="route.path === '/article' && 'active'"
      >
        文章
      </div>
      <div
        class="item hover"
        @click="dumpPage('/message')"
        :class="route.path === '/message' && 'active'"
      >
        留言
      </div>
      <div
        class="item hover"
        @click="dumpPage('/about')"
        :class="route.path === '/about' && 'active'"
      >
        关于我
      </div>
    </div>
    <div class="icon-group flex-c">
      <iconfont
        class="theme-icon hover fct icon"
        icon="&#xe64d;"
        v-if="themeStore.theme === ThemeType.Light"
        @click="themeStore.changeTheme(ThemeType.Dark)"
      />
      <iconfont
        class="theme-icon hover fct icon"
        icon="&#xe655;"
        v-else
        @click="themeStore.changeTheme(ThemeType.Light)"
      />
      <iconfont class="fct hover icon github-icon" icon="&#xe645;" @click="dumpGithub" />
    </div>
    <iconfont class="fct hover icon menu-icon" icon="&#xe877;" @click="emits('openAside')" />
  </div>
</template>

<style scoped lang="scss">
  .header-bar {
    width: 100%;
    height: v-bind(height);

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;
    transition: height 0.5s;
    background-color: var(--bgc);
    box-shadow: 0 2px 6px 1px rgba($color: #000, $alpha: 0.05);
    .logo {
      flex: 1;
      h1 {
        margin: 0;
        color: var(--fct);
        .text {
          padding: 6px 10px;
          font-size: 25px;
        }
        .letter {
          letter-spacing: 5px;
        }
      }
    }
    .menu {
      flex: 1;
      .item {
        width: 90px;
        height: 45px;
        margin: 0 15px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: var(--br);
        color: var(--fct);
        font-size: 15px;
      }
      .active {
        background-color: var(--grey);
        color: var(--fc);
      }
    }
    .icon-group {
      flex: 1;
      // opacity: 0.8;
      .theme-icon {
        margin-right: 10px;
      }
    }
    .menu-icon {
      display: none;
      position: absolute;
      right: 5%;
      // font-size: 30px;
      padding: 10px !important;
    }
    .icon {
      padding: 7px;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 1200px) {
    .header-bar {
      box-shadow: none;
      .menu,
      .icon-group {
        display: none !important;
      }
      .logo {
        .letter {
          letter-spacing: 10px;
        }
      }
      .menu-icon {
        display: block;
      }
    }
  }
</style>
