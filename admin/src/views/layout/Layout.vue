<script setup lang="ts">
  import MenuBar from './MenuBar.vue';
  import { Expand } from '@element-plus/icons-vue';
  import { inject, Ref, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { loginoutApi } from '@/network/api/base';

  // 设置响应式
  const clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));
  let isCollapse = ref<boolean>(false);
  // 判断是不是手机手机则默认收起菜单
  clientLevel.value === 3 && (isCollapse.value = true);
  watch(clientLevel, (value: number): void => {
    value === 2 && (isCollapse.value = true);
  });

  // 关闭菜单
  let drawer = ref<any>(null);
  const closeMenu = (): void => {
    drawer.value.handleClose();
  };

  const route = useRoute();
  const router = useRouter();

  const loginOut = async (): Promise<void> => {
    await loginoutApi();
    router.replace('/login');
  };
</script>

<template>
  <el-container>
    <el-aside width="null" v-if="clientLevel !== 3">
      <menu-bar :collapse="isCollapse"></menu-bar>
    </el-aside>
    <el-container>
      <el-header>
        <el-icon @click="isCollapse = !isCollapse"><expand /></el-icon>
        <h1>山岚设色</h1>
        <div class="account" @click="loginOut" title="退出登录"></div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }" :key="route.path">
          <keep-alive>
            <el-card>
              <component :is="Component" />
            </el-card>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>

  <el-drawer
    :model-value="clientLevel === 3 && !isCollapse"
    :size="250"
    custom-class="drawer"
    direction="ltr"
    :show-close="false"
    :with-header="false"
    :before-close="() => (isCollapse = true)"
    ref="drawer"
  >
    <menu-bar :collapse="isCollapse" @close-menu="closeMenu"></menu-bar>
  </el-drawer>
</template>

<style scoped lang="scss">
  .el-container {
    height: 100vh;
    color: $color;
    background: $background_color;
    .el-aside {
      background: $background_color_content;
      border-right: 1px solid $border_color;
    }
    .el-header {
      background-color: $background_color_content;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $border_color;
      h1 {
        color: $color_tint;
        margin: 0;
      }
      .el-icon {
        font-size: 25px;
        opacity: 0.6;
        color: $color;
        cursor: pointer;
      }
      .account {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ee4863;
        cursor: pointer;
      }
    }
    .el-main {
      width: 100%;
      padding: 0;
      .el-card {
        height: 100%;
        overflow: auto;
        background-color: $background_color_content;
        border: none;
      }
    }
  }
  .drawer {
    .el-drawer__body {
      padding: 0 !important;
    }
  }
</style>
