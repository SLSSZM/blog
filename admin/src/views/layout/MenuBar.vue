<script setup lang="ts">
  import {
    Platform,
    Collection,
    List,
    DocumentAdd,
    Edit,
    PriceTag,
    Message,
    Setting,
    User,
  } from '@element-plus/icons-vue';
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  // 发起关闭菜单命令
  const emit = defineEmits<{
    (e: 'closeMenu'): void;
  }>();
  const handlerSelect = (): void => {
    emit('closeMenu');
  };
  const Info = reactive(JSON.parse(localStorage.getItem('INFO') || '{}'));
</script>

<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    router
    :collapse-transition="false"
    @select="handlerSelect"
  >
    <el-menu-item index="/workbench">
      <el-icon><platform /></el-icon>
      <span>工作台</span>
    </el-menu-item>
    <el-menu-item index="/config">
      <el-icon><setting /></el-icon>
      <span>页面设置</span>
    </el-menu-item>
    <el-menu-item index="/account" v-if="Info && Info.role === 'root'">
      <el-icon><user /></el-icon>
      <span>账户管理</span>
    </el-menu-item>
    <el-sub-menu index="/post">
      <template #title>
        <el-icon><collection /></el-icon>
        <span>文章管理</span>
      </template>
      <el-menu-item index="/article">
        <el-icon><list /></el-icon>文章列表
      </el-menu-item>
      <el-menu-item index="/article/create">
        <el-icon><document-add /></el-icon>
        新建文章
      </el-menu-item>
      <el-menu-item index="/article/edit" v-show="route.path === '/article/edit'">
        <el-icon><edit /></el-icon>
        编辑文章
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/tag">
      <el-icon><price-tag /></el-icon>
      <span>标签管理</span>
    </el-menu-item>
    <el-menu-item index="/message">
      <el-icon><message /></el-icon>
      <span>留言管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
  .el-menu {
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
