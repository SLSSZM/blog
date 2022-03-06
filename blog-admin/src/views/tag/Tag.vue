<script setup lang="ts">
  import { fetchTagApi, Tag } from '@/network/api/tag';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { inject, Ref, ref } from 'vue';

  let tableData = ref<Tag[]>([]);
  let loading = ref<boolean>(false);
  let page = ref<number>(1);
  let total = ref<number>(50);
  let name = ref<string>('');

  const fetchTag = async (): Promise<void> => {
    loading.value = true;
    const res = await fetchTagApi({
      name: name.value,
      page: page.value,
      count: 10,
    });
    tableData.value = res.data.list;
    total.value = res.data.total;
    loading.value = false;
  };
  fetchTag();
  const handlerQuery = (): void => {
    page.value = 1;
    fetchTag();
  };
  const currentChange = (value: number): void => {
    page.value = value;
    fetchTag();
  };
  const keydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handlerQuery();
    }
  };
  // 设置响应式
  const clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));
</script>

<template>
  <div class="tag">
    <div class="query">
      <el-input
        v-model="name"
        @keydown="keydown"
        placeholder="按名称搜索"
        clearable
        style="max-width: 300px"
      />
      <el-button type="primary" @click="handlerQuery">搜索</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" fixed />
      <el-table-column prop="name" label="名称">
        <template #default="{ row }">
          <el-tag size="large">{{ row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200px"
        :fixed="clientLevel === 3 ? false : 'right'"
        label="修改 / 删除"
      >
        <el-button round>
          <el-icon><edit /></el-icon>
        </el-button>
        <el-button round>
          <el-icon><delete /></el-icon>
        </el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :pager-count="5"
      :current-page="page"
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
