<script setup lang="ts">
  import UploadPicture from '@/components/element/UploadPicture.vue';
  import { reactive } from 'vue';
  import { Config, fetchConfigApi, updateConfigApi } from '@/network/api/config';
  import { ElMessage } from 'element-plus';

  let config = reactive<{ data: Config }>({ data: {} });
  const created = async (): Promise<void> => {
    const res = await fetchConfigApi();
    config.data = res.data;
  };
  created();
  const handlerSave = async (): Promise<void> => {
    await updateConfigApi(config.data);
    ElMessage.success('修改成功');
  };
</script>

<template>
  <el-form class="config" label-width="120px" size="large">
    <el-form-item label="一言背景图：">
      <upload-picture :image="config.data.image" @upload="config.data.image = $event" />
    </el-form-item>
    <el-form-item label="用户默认头像：">
      <upload-picture :image="config.data.userAvatar" @upload="config.data.userAvatar = $event" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" auto-insert-space @click="handlerSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
