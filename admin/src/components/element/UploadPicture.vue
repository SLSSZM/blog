<script setup lang="ts">
  import { reactive } from 'vue';
  import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { UploadFile } from 'element-plus/es/components/upload/src/upload.type';
  import { useRouter } from 'vue-router';
  import { compress, compressAccurately } from 'image-conversion';

  const headers = reactive<any>({ authorization: 'Bearer ' + localStorage.token });
  const api = import.meta.env.VITE_API + '/upload';

  interface Props {
    image?: string;
    height?: string;
    width?: string;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    image: '',
    height: '200px',
    width: '100%',
    disabled: false,
  });
  const emits = defineEmits<{
    (e: 'upload', url: string): void;
    (e: 'update:image', url: string): void;
    (e: 'delete'): void;
  }>();
  const handleUploadSuccess = (res: any, file: UploadFile) => {
    emits('upload', res.data.url);
    emits('update:image', res.data.url);
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
    emits('update:image', '');
    emits('delete');
  };
  const beforeUpload = async (rawFile: any): Promise<Blob> => {
    if (rawFile.size / 1024 / 1024 < 1) {
      return await compress(rawFile, 0.8);
    }
    return await compressAccurately(rawFile, {
      size: 1024,
      accuracy: 0.8,
    });
  };
  const openImage = (): void => {
    window.open(props.image);
  };
</script>

<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="api"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :on-error="handlerUploadError"
      :disabled="disabled"
      :before-upload="beforeUpload"
    >
      <img v-if="props.image" :src="props.image" class="avatar" cover />
      <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
      <div v-if="props.image" class="hover-icon">
        <el-icon class="preview-icon" @click.stop="openImage"><zoom-in /></el-icon>
        <el-icon class="preview-icon" @click.stop="handlerDelete"><delete /></el-icon>
      </div>
    </el-upload>
  </div>
</template>

<style scoped lang="scss">
  .avatar-uploader :deep(.el-upload) {
    width: v-bind('props.width');
    height: v-bind('props.height');
    min-width: 100px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      .hover-icon {
        display: flex;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        border-radius: inherit;
        z-index: 1;
      }
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: v-bind('props.width');
    height: v-bind('props.height');
    min-width: 100px;
    text-align: center;
  }
  .avatar {
    width: v-bind('props.width');
    height: v-bind('props.height');
    min-width: 100px;
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
    z-index: 2;
    justify-content: center;
    align-items: center;
    .preview-icon {
      font-size: 25px;
      color: $color_reverse;
      padding: 5px;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid transparent;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        border-color: $color_reverse;
      }
    }
  }
</style>
