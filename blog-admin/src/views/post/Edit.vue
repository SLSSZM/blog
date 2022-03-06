<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import Editor from '@/components/Editor.vue';

  let post = reactive<{ title: string; tag: string[]; content: string }>({
    title: '',
    tag: [],
    content: '',
  });
  let rules = reactive({
    title: { required: true, message: '请输入文章标题', trigger: 'blur' },
    tag: { required: true, message: '请选择标签', trigger: 'change' },
  });
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
        <el-select
          v-model="post.tag"
          size="large"
          placeholder="请选择标签"
          clearable
          multiple
        ></el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="info">保存为草稿</el-button>
          <el-button type="primary">保存文章</el-button>
        </div>
      </el-form-item>
    </el-form>
    <editor :value="post.content" @data="post.content = $event" />
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
