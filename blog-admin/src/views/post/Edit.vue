<script setup lang="ts">
  import { createPostApi, Post } from '@/network/api/post';
  import { fetchTagApi, Tag } from '@/network/api/tag';
  import { ElMessage } from 'element-plus';
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  const Markdown = defineAsyncComponent(() => import('@/components/markdown/Markdown.vue'));

  let post = reactive<Post>({
    title: '',
    tag: [],
    content: '',
    status: false,
  });
  let rules = reactive({
    title: { required: true, message: '请输入文章标题', trigger: 'blur' },
    tag: { required: true, message: '请选择标签', trigger: 'change' },
  });
  let tags = reactive<{ data?: Tag[] }>({});
  const fetchTag = async (): Promise<void> => {
    const res = await fetchTagApi();
    tags.data = res.data.list;
  };
  fetchTag();
  const router = useRouter();
  const handlerCreate = async (status: boolean): Promise<void> => {
    post.status = status;
    await createPostApi(post);
    router.push('/post');
    if (status) {
      ElMessage.success('提交成功');
    } else {
      ElMessage.success('保存成功');
    }
  };
</script>

<template>
  <div class="edit">
    <el-form inline ref="postRef" :model="post" :rules="rules">
      <el-form-item prop="title">
        <el-input
          v-model="post.title"
          size="large"
          placeholder="请输入文章标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="tag">
        <el-select v-model="post.tag" size="large" placeholder="请选择标签" clearable multiple>
          <el-option
            v-for="item in tags.data"
            :key="item._id"
            :label="item.name"
            :value="item._id!"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="info" @click="handlerCreate(false)">保存文章</el-button>
          <el-button type="primary" @click="handlerCreate(true)">提交文章</el-button>
        </div>
      </el-form-item>
    </el-form>
    <markdown :value="post.content" />
  </div>
</template>

<style scoped lang="scss">
  .edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .el-form-item {
        width: 30%;
        min-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
        .el-select {
          width: 100%;
        }
        .btn {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
    .changeEditor {
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      .el-button {
        width: 30%;
        min-width: 120px;
        max-width: 300px;
        opacity: 0.8;
      }
    }
  }
</style>
