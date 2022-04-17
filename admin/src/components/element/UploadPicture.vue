<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { UploadFile } from 'element-plus/es/components/upload/src/upload.type';
  import { useRouter } from 'vue-router';

  const headers = reactive<any>({ authorization: 'Bearer ' + localStorage.token });
  const api = import.meta.env.VITE_API + '/admin/upload';

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
    emits('upload', '');
    emits('delete');
  };
  let imageDialog = ref<boolean>(false);
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
    z-index: 1;
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
