<script setup lang="ts">
  import { useThemeStore, ThemeType } from '@/store/theme';
  import { ref, watch } from 'vue';
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import SlButton from '@/components/slButton/SlButton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useConfigStore } from '@/store/config';

  const themeStore = useThemeStore();
  let width = ref<string>('300px');
  interface Props {
    show: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    show: false,
  });
  watch(
    () => props.show,
    (value: boolean) => {
      if (!value) {
        width.value = '0px';
      } else {
        width.value = '300px';
      }
    },
    {
      immediate: true,
    }
  );
  const emits = defineEmits<{
    (e: 'close'): void;
  }>();
  const router = useRouter();
  const route = useRoute();
  const dumpPage = (path: string): void => {
    router.push(path);
    emits('close');
  };
  const configState = useConfigStore();
  const dumpGithub = (): void => {
    window.open(configState.configData.configs.githubPath);
  };
</script>

<template>
  <div class="aside-bar">
    <div class="icons">
      <iconfont
        class="hover fct icon"
        icon="&#xe64d;"
        v-if="themeStore.theme === ThemeType.Light"
        @click="themeStore.changeTheme(ThemeType.Dark)"
      />
      <iconfont
        class="hover fct icon"
        icon="&#xe655;"
        v-else
        @click="themeStore.changeTheme(ThemeType.Light)"
      />
      <iconfont class="fct hover icon github-icon" icon="&#xe645;" @click="dumpGithub" />
    </div>
    <div class="avatar flex-c">
      <img :src="configState.configData?.configs?.myAvatar" alt="" />
    </div>
    <h1 class="flex-c" @click="dumpPage('/')">
      <span class="text hover fct"> <span class="letter">山岚设</span>色 </span>
    </h1>
    <div class="menu">
      <div :class="['item', 'flex-c', { active: route.path === '/home' }]" @click="dumpPage('/')">
        <iconfont class="fct icon" icon="&#xe646;"></iconfont>
        <span>首页</span>
      </div>
      <div
        :class="['item', 'flex-c', { active: route.path === '/article' }]"
        @click="dumpPage('/article')"
      >
        <iconfont class="fct icon" icon="&#xe633;"></iconfont>
        <span>文章</span>
      </div>
      <div
        :class="['item', 'flex-c', { active: route.path === '/message' }]"
        @click="dumpPage('/message')"
      >
        <iconfont class="fct icon" icon="&#xe649;"></iconfont>
        <span>留言</span>
      </div>
      <div
        :class="['item', 'flex-c', { active: route.path === '/about' }]"
        @click="dumpPage('/about')"
      >
        <iconfont class="fct icon" icon="&#xe634;"></iconfont>
        <span>关于</span>
      </div>
    </div>
    <sl-button class="close" @click="emits('close')">关闭</sl-button>
  </div>
</template>

<style scoped lang="scss">
  .aside-bar {
    width: v-bind(width);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: var(--bg);
    transition: width 0.3s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icons {
      margin-top: 10px;
      margin-bottom: 20px;
      width: 250px;
      display: flex;
      justify-content: space-between;
      .icon {
        padding: 10px;
        border-radius: 50%;
        font-size: 28px;
      }
    }
    .avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
      border: 5px solid var(--bc);
      border-radius: 50%;
      overflow: hidden;
      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
    }
    h1 {
      margin: 0;
      width: 300px;
      margin-bottom: 30px;
      color: var(--fct);
      .text {
        padding: 6px 10px;
        font-size: 26px;
      }
      .letter {
        letter-spacing: 8px;
      }
    }
    .menu {
      width: 300px;
      .item {
        width: 300px;
        height: 60px;
        cursor: pointer;
        background-color: var(--bg);
        .icon {
          margin-right: 20px;
        }
        .icon,
        span {
          transition: transform 0.3s;
        }
        &:hover {
          background-color: var(--hover);
          .icon,
          span {
            transform: scale(1.2);
          }
        }
        &.active {
          background-color: var(--grey_t) !important;
        }
      }
    }
    .close {
      position: absolute;
      bottom: 0;
      width: 300px;
      border-radius: 0;
      height: 60px;
    }
  }
</style>
