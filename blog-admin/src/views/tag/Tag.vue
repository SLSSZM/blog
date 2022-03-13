<script setup lang="ts">
  import { fetchTagApi, Tag, updateTagApi, deleteTagApi, createTagApi } from '@/network/api/tag';
  import { FolderChecked, Delete, FolderAdd } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { inject, Ref, ref } from 'vue';

  let tableData = ref<Tag[]>([]);
  let loading = ref<boolean>(false);
  let page = ref<number>(1);
  let count = ref<number>(8);
  let total = ref<number>(50);
  let name = ref<string>('');

  const fetchTag = async (): Promise<void> => {
    loading.value = true;
    const res = await fetchTagApi({
      name: name.value,
      page: page.value,
      count: count.value,
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

  const handlerSave = async (tag: Tag): Promise<void> => {
    if (!tag.name) return;
    await updateTagApi(tag._id!, tag);
    ElMessage.success('修改成功');
    fetchTag();
  };
  const handlerDelete = async (id: string): Promise<void> => {
    await deleteTagApi(id);
    ElMessage.success('删除成功');
    fetchTag();
  };
  const handlerAdd = async (): Promise<void> => {
    if (!name.value) return;
    await createTagApi({ name: name.value });
    ElMessage.success('新增成功');
    name.value = '';
    fetchTag();
  };
</script>

<template>
  <div class="tag">
    <div class="query">
      <el-input
        v-model="name"
        @keydown="keydown"
        placeholder="新增标签或按名称搜索"
        clearable
        style="max-width: 300px"
      />
      <el-button type="primary" @click="handlerQuery">搜索</el-button>
      <el-button type="danger" @click="handlerAdd">
        <el-icon class="color_reverse"><folder-add /></el-icon>
        &nbsp;新增
      </el-button>
    </div>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column type="index" fixed />
      <el-table-column label="名称">
        <template #default="{ row }">
          <el-input v-model="row.name" clearable size="large"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="200px"
        :fixed="clientLevel === 3 ? false : 'right'"
        label="保存 或 删除"
      >
        <template #default="{ row }">
          <el-button round size="large" @click="handlerSave(row)">
            <el-icon><folder-checked /></el-icon>
          </el-button>
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
