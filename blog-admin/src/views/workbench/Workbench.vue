<script setup lang="ts">
  import { workbenchApi, Workbench } from '@/network/api/base';
  import { reactive } from 'vue';
  import dayjs from 'dayjs';
  import { LocationQueryRaw, useRouter } from 'vue-router';

  let data = reactive<{ value: Workbench }>({ value: {} });
  const created = async (): Promise<void> => {
    const res = await workbenchApi();
    data.value = res.data;
  };
  created();

  const router = useRouter();
  const handlerInfo = (value: any): void => {
    router.push({ path: '/article/edit', query: value as LocationQueryRaw });
  };
</script>

<template>
  <div class="workbench">
    <h1>后台管理：工作台</h1>
    <h3>统计：</h3>
    <div class="stastics">
      <div class="card">
        <span class="title">网站访问量：</span>
        <span class="data">{{ data.value.userViews }}</span>
      </div>
      <div class="card">
        <span class="title">文章总数：</span>
        <span class="data">{{ data.value.articleTotal }}</span>
      </div>
    </div>
    <h3>热门文章：</h3>
    <div
      class="item card"
      v-for="item in data.value.hotArticles"
      :key="item._id"
      @click="handlerInfo(item)"
    >
      <span>文章标题：{{ item.title }}</span>
      <span>类型：{{ item.type === 'post' ? '博客' : '日常' }}</span>
      <span>创建时间：{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      <span class="views">访问量：{{ item.views }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .workbench {
    color: $color;
    h1 {
      text-align: center;
      margin: 0;
      margin-bottom: 10px;
      font-size: 30px;
      color: $color_tint;
    }
    .stastics {
      display: flex;
      flex-wrap: wrap;
      .card {
        min-width: 200px;
        height: 50px;
        flex: 1;
        .title {
          font-size: 20px;
        }
        .data {
          font-size: 50px;
          color: $color_tint;
        }
      }
    }
    h3 {
      margin: 0 10px;
      font-size: 20px;
      color: $color_tint;
    }
    .item {
      span {
        min-width: 200px;
        margin: 5px;
        flex: 1;
      }
      .views {
        color: $color_tint;
        text-align: end;
      }
    }
  }
  .card {
    margin: 20px 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 6px 1px rgba($color: #5a5a5a, $alpha: 0.3);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
</style>
