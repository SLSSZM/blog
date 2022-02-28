<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import Editor from '@/components/Editor.vue';
  import Markdown from '@/components/Markdown.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  let editorType = ref<string>('editor');
  let article = reactive<{ title: string; tag: string[]; content: string }>({
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
    <el-form inline ref="articleRef" :model="article" :rules="rules">
      <el-form-item prop="title">
        <el-input
          v-model="article.title"
          size="large"
          placeholder="请输入文章标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="tag">
        <el-select
          v-model="article.tag"
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
    <div class="changeEditor" v-if="route.path === '/article/create'">
      <el-button
        :type="editorType === 'editor' ? 'primary' : 'info'"
        @click="editorType = 'editor'"
        size="large"
        :plain="editorType === 'editor' ? false : true"
        round
      >
        富文本编辑器
      </el-button>
      <el-button
        :type="editorType === 'markdown' ? 'primary' : 'info'"
        @click="editorType = 'markdown'"
        size="large"
        :plain="editorType === 'markdown' ? false : true"
        round
      >
        Markdown
      </el-button>
    </div>
    <editor
      v-if="editorType === 'editor'"
      :value="article.content"
      @data="article.content = $event"
    />
    <markdown
      v-if="editorType === 'markdown'"
      :value="article.content"
      @data="article.content = $event"
    />
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
