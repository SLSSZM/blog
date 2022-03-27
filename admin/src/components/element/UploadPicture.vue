<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { UploadFile } from 'element-plus/es/components/upload/src/upload.type';
  import { useRouter } from 'vue-router';

  const headers = reactive<any>({ authorization: 'Bearer ' + localStorage.token });

  interface Props {
    image: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    image: '',
  });
  const emits = defineEmits<{
    (e: 'upload', url: string): void;
  }>();
  const handleUploadSuccess = (res: any, file: UploadFile) => {
    emits('upload', res.data.url);
    // 刷新token
    if (res.token) {
      localStorage.setItem('token', res.token);
    }
  };
  const router = useRouter();
  const handlerUploadError = (res: any, file: UploadFile) => {
    ElMessage.error('图片上传失败');
    if (res.status === 401) {
      router.replace('/login');
    }
  };
  const handlerDelete = () => {
    emits('upload', '');
  };
  let imageDialog = ref<boolean>(false);
</script>

<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3001/api/admin/upload"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :on-error="handlerUploadError"
    >
      <img v-if="props.image" :src="props.image" class="avatar" cover />
      <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
      <div v-if="props.image" class="hover-icon">
        <el-icon class="preview-icon" @click.stop="imageDialog = true"><zoom-in /></el-icon>
        <el-icon class="preview-icon" @click.stop="handlerDelete"><delete /></el-icon>
      </div>
    </el-upload>
    <el-dialog v-model="imageDialog">
      <img style="width: 100%" :src="props.image" cover />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  .avatar-uploader :deep(.el-upload) {
    width: 100%;
    height: 300px;
    min-width: 200px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      .hover-icon {
        display: block;
      }
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 300px;
    min-width: 200px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 300px;
    min-width: 200px;
    object-fit: cover;
    display: block;
    border-radius: 12px;
    overflow: hidden;
  }
  .hover-icon {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    .preview-icon {
      font-size: 25px;
      color: $color_reverse;
      padding: 5px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        border-radius: 50%;
        padding: 5px;
        border: 1px solid $color_reverse;
      }
    }
  }
</style>
