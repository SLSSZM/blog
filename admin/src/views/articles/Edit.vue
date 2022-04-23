<script setup lang="ts">
  import { createPostApi, Article, updatePostApi } from '@/network/api/article';
  import { fetchTagApi, Tag } from '@/network/api/tag';
  import { ElMessage } from 'element-plus';
  import { defineAsyncComponent, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import UploadPicture from '@/components/element/UploadPicture.vue';
  const Markdown = defineAsyncComponent(() => import('@/components/markdown/Markdown.vue'));

  let article = reactive<{ data: Article }>({
    data: {
      title: '',
      description: '',
      tag: [],
      body: '',
      type: 'post',
      submit: false,
    },
  });
  let rules = reactive({
    title: { required: true, message: '请输入文章标题', trigger: 'blur' },
    description: { required: true, message: '请输入文章描述', trigger: 'blur' },
    tag: { required: true, message: '请选择标签', trigger: 'change' },
    type: { required: true, message: '请选择类型', trigger: 'change' },
  });
  let tags = reactive<{ data?: Tag[] }>({});
  const fetchTag = async (): Promise<void> => {
    const res = await fetchTagApi();
    tags.data = res.data.list;
  };
  fetchTag();
  const router = useRouter();
  const route = useRoute();
  if (route.query._id) {
    article.data = route.query as any;
  }
  let postRef = ref<any>();
  const handlerSave = async (submit: boolean): Promise<void> => {
    await postRef.value.validate(async (valid: boolean) => {
      if (valid) {
        article.data.submit = submit;
        if (route.query._id) {
          await updatePostApi(article.data._id!, article.data);
        } else {
          await createPostApi(article.data);
        }
        router.push('/article');
        if (submit) {
          ElMessage.success('提交成功');
        } else {
          ElMessage.success('保存成功');
        }
      }
    });
  };
</script>

<template>
  <div class="edit">
    <el-form
      inline
      ref="postRef"
      :model="article.data"
      :rules="rules"
      size="large"
      label-width="60px"
    >
      <el-form-item prop="title" label="标题" style="width: 100%">
        <el-input v-model="article.data.title" placeholder="请输入文章标题" clearable></el-input>
      </el-form-item>
      <el-form-item prop="description" style="width: 100%" label="描述">
        <el-input
          v-model="article.data.description"
          type="textarea"
          placeholder="请输入文章描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="tag" label="标签">
        <el-select v-model="article.data.tag" placeholder="请选择文章标签" clearable multiple>
          <el-option
            v-for="item in tags.data"
            :key="item._id"
            :label="item.name"
            :value="item._id!"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type" label="类型">
        <el-radio-group v-model="article.data.type" placeholder="请选择文章类型">
          <el-radio-button label="post">博客</el-radio-button>
          <el-radio-button label="article">日常</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="image" label="图片" style="width: 100%">
        <upload-picture v-model:image="article.data.image" style="width: 100%" />
      </el-form-item>
      <el-form-item style="width: 100%; margin-bottom: 20px">
        <markdown v-model="article.data.body" />
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button plain type="info" @click="handlerSave(false)">
            {{ route.query._id ? '更改为文章' : '保存为文章' }}
          </el-button>
          <el-button type="primary" @click="handlerSave(true)">提交文章</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
  .edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .el-form-item {
        margin-left: 0;
        margin-right: 0;
        width: 50%;
        .el-select {
          width: 100%;
        }
        .btn {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
      @media screen and (max-width: 1000px) {
        .el-form-item {
          width: 100%;
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
