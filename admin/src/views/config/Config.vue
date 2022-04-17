<script setup lang="ts">
  import UploadPicture from '@/components/element/UploadPicture.vue';
  import { reactive } from 'vue';
  import { Config, fetchConfigApi, updateConfigApi } from '@/network/api/config';
  import { ElMessage } from 'element-plus';
  import Markdown from '@/components/markdown/Markdown.vue';

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
  <el-form class="config" label-width="150px" size="large">
    <el-form-item label="一言背景图：">
      <upload-picture width="500px" height="200px" v-model:image="config.data.image" />
    </el-form-item>
    <el-form-item label="我的头像：">
      <upload-picture height="100px" width="100px" v-model:image="config.data.myAvatar" />
    </el-form-item>
    <el-form-item label="用户默认头像组：">
      <upload-picture
        class="user-avatar"
        height="100px"
        width="100px"
        v-for="(item, index) in config.data.userAvatar"
        :key="item"
        :image="item"
        disabled
        @delete="config.data.userAvatar = config.data.userAvatar?.splice(index)"
      />
      <upload-picture height="100px" width="100px" @upload="config.data.userAvatar?.push($event)" />
    </el-form-item>
    <el-form-item label="关于我：">
      <markdown v-model="config.data.description" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" auto-insert-space @click="handlerSave">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
  .user-avatar {
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>
