<script setup lang="ts">
  import { fetchPostApi, fetchPostOneApi, Post } from '@/network/api/post';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { inject, Ref, ref } from 'vue';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';

  let tableData = ref<Post[]>([]);
  let loading = ref<boolean>(false);
  let currentPage = ref<number>(1);

  const fetchPost = async (): Promise<void> => {
    loading.value = true;
    const res = await fetchPostApi();
    tableData.value = res.data.list;
    loading.value = false;
  };
  fetchPost();
  const handlerQuery = (): void => {
    currentPage.value = 1;
    fetchPost();
  };
  const currentChange = (value: number): void => {
    currentPage.value = value;
    fetchPost();
  };

  let searchTitle = ref<string>('');

  // 设置响应式
  const clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));

  const router = useRouter();
  const handlerUpdate = async (id: string): Promise<void> => {
    const res = await fetchPostOneApi(id);
    // router.push({ path: '/post/edit', query: res.data as any });
  };
</script>

<template>
  <div class="post">
    <div class="query">
      <el-input v-model="searchTitle" placeholder="按标题搜索" clearable style="max-width: 300px" />
      <el-button type="primary" @click="handlerQuery">搜索</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" fixed />
      <el-table-column prop="title" label="标题" min-width="160px" />
      <el-table-column prop="createTime" label="创建时间" min-width="180px">
        <template #default="{ row }">
          {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100px">
        <template #default="{ row }">
          <el-tag :type="row.status ? '' : 'warning'">{{ row.status ? '已提交' : '草稿' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200px"
        :fixed="clientLevel === 3 ? false : 'right'"
        label="修改 / 删除"
      >
        <template #default="{ row }">
          <el-button round @click="handlerUpdate(row._id)">
            <el-icon><edit /></el-icon>
          </el-button>
          <el-button round>
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      :pager-count="5"
      :current-page="currentPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<style scoped lang="scss">
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
  .query {
    margin-bottom: 10px;
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
</style>
