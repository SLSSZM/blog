<script setup lang="ts">
  import { fetchAccountApi, Account, deleteAccountApi } from '@/network/api/account';
  import { Delete } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { inject, reactive, Ref, ref } from 'vue';
  import AccountForm from './childComponents/AccountForm.vue';
  import dayjs from 'dayjs';

  let tableData = ref<Account[]>([]);
  let loading = ref<boolean>(false);
  let page = ref<number>(1);
  let count = ref<number>(8);
  let total = ref<number>(50);
  let username = ref<string>('');

  const fetchList = async (): Promise<void> => {
    loading.value = true;
    const res = await fetchAccountApi({
      username: username.value,
      page: page.value,
      count: count.value,
    });
    tableData.value = res.data.list || [];
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
    await deleteAccountApi(id);
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
  let dialogVisible = ref<boolean>(false);
  let formData = reactive<{ data: Account }>({ data: {} });
  const handlerCreate = (row?: Account): void => {
    if (row?._id) {
      formData.data = row;
    }
    dialogVisible.value = true;
  };
  const handlerSuccess = (): void => {
    fetchList();
    dialogVisible.value = false;
  };
</script>

<template>
  <div class="message">
    <div class="query">
      <el-input
        v-model="username"
        @keydown="keydown"
        placeholder="用户名搜索"
        clearable
        style="max-width: 300px"
      />
      <el-button type="primary" @click="handlerQuery">搜索</el-button>
      <el-button type="success" @click="handlerCreate()">创建账户</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" fixed />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="权限" prop="role" />
      <el-table-column label="创建时间" prop="createdAt" min-width="180px">
        <template #default="{ row }">
          {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="修改">
        <template #default="{ row }">
          <el-button type="text" @click="handlerCreate(row)">修改信息</el-button>
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
    />
  </div>
  <el-dialog
    destroy-on-close
    title="账户"
    v-model="dialogVisible"
    width="300px"
    :fullscreen="clientLevel === 3"
  >
    <account-form
      :form-data="formData.data"
      @cancel="dialogVisible = false"
      @success="handlerSuccess"
    />
  </el-dialog>
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
