<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElForm, ElMessage } from 'element-plus';
  import { loginApi } from '@/network/api/base';

  type FormInstance = InstanceType<typeof ElForm>;

  const router = useRouter();
  const formRef = ref<FormInstance | null>(null);
  const form = reactive<{ username: string; password: string }>({ username: '', password: '' });
  const rules = reactive({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });
  const login = (): void => {
    formRef.value?.validate(async (valid: any) => {
      if (valid) {
        const res = await loginApi(form);
        localStorage.setItem('INFO', JSON.stringify(res.data));
        router.replace('/');
        ElMessage.success('登录成功');
      }
    });
  };
</script>

<template>
  <div class="form-card">
    <el-form ref="formRef" :model="form" :rules="rules" @keydown.enter="login" size="large">
      <h3>登录</h3>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="text-button-group">
          <el-button type="text">忘记密码</el-button>
          <el-button type="text">注册</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="confirm" type="primary" @click="login"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
  .form-card {
    width: 50%;
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form {
      width: 60%;
      min-width: 250px;
      .text-button-group {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .confirm {
        width: 100%;
      }
    }
  }
</style>
