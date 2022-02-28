<script setup lang="ts">
  import MenuBar from './MenuBar.vue';
  import { Expand } from '@element-plus/icons-vue';
  import { inject, Ref, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

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
</script>

<template>
  <el-container>
    <el-aside width="null" v-if="clientLevel !== 3">
      <menu-bar :collapse="isCollapse"></menu-bar>
    </el-aside>
    <el-container>
      <el-header>
        <el-icon @click="isCollapse = !isCollapse"><expand /></el-icon>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }" :key="route.path">
          <keep-alive>
            <el-card :body-style="{ overflow: 'auto' }">
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
    color: $color;
    background: $background_color;
    .el-aside {
      background: $background_color_content;
    }
    .el-header {
      background-color: $background_color_content;
      display: flex;
      align-items: center;
      .el-icon {
        font-size: 25px;
        opacity: 0.6;
        color: $color;
        cursor: pointer;
      }
    }
    .el-main {
      width: 100%;
      padding: 0;
      overflow: hidden;
      .el-card {
        height: 100%;
        background-color: $background_color_content;
      }
    }
  }
  .drawer {
    .el-drawer__body {
      padding: 0 !important;
    }
  }
</style>
