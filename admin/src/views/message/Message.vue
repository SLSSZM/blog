<script setup lang="ts">
  import { fetchMessageApi, Message, deleteMessageApi } from '@/network/api/message';
  import { Delete } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { inject, Ref, ref } from 'vue';
  import dayjs from 'dayjs';

  let tableData = ref<Message[]>([]);
  let loading = ref<boolean>(false);
  let page = ref<number>(1);
  let count = ref<number>(8);
  let total = ref<number>(50);
  let email = ref<string>('');

  const fetchList = async (): Promise<void> => {
    loading.value = true;
    const res = await fetchMessageApi({ email: email.value, page: page.value, count: count.value });
    tableData.value = res.data.list;
    total.value = res.data.total;
    loading.value = false;
  };
  fetchList();
  const currentChange = (value: number): void => {
    page.value = value;
    fetchList();
  };
  // 设置响应式
  const clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));

  const handlerDelete = async (id: string): Promise<void> => {
    await deleteMessageApi(id);
    ElMessage.success('删除成功');
    fetchList();
  };
  const handlerQuery = (): void => {
    page.value = 1;
    fetchList();
  };
  const keydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handlerQuery();
    }
  };
</script>

<template>
  <div class="message">
    <div class="query">
      <el-input
        v-model="email"
        @keydown="keydown"
        placeholder="按邮箱搜索"
        clearable
        style="max-width: 300px"
      />
      <el-button type="primary" @click="handlerQuery">搜索</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" fixed />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="邮箱" prop="email" min-width="180px" />
      <el-table-column label="内容" prop="content" min-width="180px" />
      <el-table-column label="创建时间" prop="createdAt" min-width="180px">
        <template #default="{ row }">
          {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200px"
        :fixed="clientLevel === 3 ? false : 'right'"
        label="删除"
      >
        <template #default="{ row }">
          <el-button round size="large" @click="handlerDelete(row._id)">
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :pager-count="5"
      :current-page="page"
      :page-size="count"
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
  .color_reverse {
    color: $color_reverse;
  }
</style>
