<script setup lang="ts">
  import { workbenchApi, Workbench, deleteUploadApi } from '@/network/api/base';
  import { reactive } from 'vue';
  import dayjs from 'dayjs';
  import { LocationQueryRaw, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';

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
  const isRoot = JSON.parse(localStorage.getItem('INFO') || '{}').role === 'root';
  console.log(JSON.parse(localStorage.getItem('INFO') || '{}').role);
  const handlerDeleteUploads = async (): Promise<void> => {
    await deleteUploadApi();
    ElMessage.success('清除成功');
  };
</script>

<template>
  <div class="workbench">
    <h1>后台管理：工作台</h1>
    <h3>统计：</h3>
    <div class="stastics">
      <div class="card">
        <span class="title">网站访问量：</span>
        <span class="data">{{ data.value.userViews || 0 }}</span>
      </div>
      <div class="card">
        <span class="title">文章总数：</span>
        <span class="data">{{ data.value.articleTotal || 0 }}</span>
      </div>
    </div>
    <h3>热门文章：</h3>
    <div v-if="!data.value.hotArticles?.length" class="notArticle">无</div>
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
    <div class="delete-uploads" v-if="isRoot">
      <span>删除存在服务器上的过期图片，谨慎使用！</span>
      <el-button type="danger" @click="handlerDeleteUploads"> 清除过期图片 </el-button>
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
  .notArticle {
    text-align: center;
    color: $color_tint;
  }
  .card {
    margin: 20px 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px rgba($color: #5a5a5a, $alpha: 0.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .delete-uploads {
    margin: 20px 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: space-between;
    span {
      color: var(--color_tint);
      margin-bottom: 10px;
      margin-right: 20px;
    }
    .el-button {
      margin-bottom: 10px;
    }
  }
</style>
