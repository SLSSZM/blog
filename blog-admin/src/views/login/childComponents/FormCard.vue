<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <div class="form-card">
    <el-form>
      <h3>登录</h3>
      <el-form-item>
        <el-input placeholder="账号" size="large" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="密码"
          type="password"
          size="large"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="text-button-group">
          <el-button type="text">忘记密码</el-button>
          <el-button type="text">注册</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="confirm" type="primary" size="large" @click="router.replace('/')">
          登录
        </el-button>
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
