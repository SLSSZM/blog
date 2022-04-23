<template>
  <view class="login">
    <view class="h1"><text>山岚设</text>色</view>
    <view class="form">
      <view class="form-item">
        <input placeholder="请输入账号" v-model="form.username" />
      </view>
      <view class="form-item">
        <input placeholder="请输入密码" v-model="form.password" type="password" />
      </view>
      <view class="form-item button-group">
        <button class="reset" @click="handlerReset">清空</button>
        <button @click="handlerSubmit">登录</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { loginApi } from '../../network/api/index';

  let form = reactive<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const handlerSubmit = async (): Promise<void> => {
    const res = await loginApi({
      data: {
        username: form.username,
        password: form.password,
      },
    });
    if (res.data) {
      uni.switchTab({ url: '/pages/message/Message' });
    }
    uni.setStorageSync('token', res.token);
  };
  const handlerReset = (data: any): void => {
    form.password = '';
    form.username = '';
  };
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $bg;
    height: 100vh;
    .h1 {
      margin: 60rpx 0;
      font-size: 50rpx;
      font-weight: bold;
      color: $fct;
      text {
        letter-spacing: 8px;
      }
    }
    .form {
      width: 100%;
      .form-item {
        display: flex;
        justify-content: center;
        input {
          width: 80%;
          height: 100rpx;
          padding: 0 20px;
          margin-bottom: 40rpx;
          background-color: $bgc;
          border-radius: 20rpx;
        }
        button {
          margin: 30rpx 20rpx 0;
          width: 260rpx;
          height: 80rpx;
          line-height: 80rpx;
          font-size: 28rpx;
          color: #fff;
          background-color: $primary;
          border: none;
          &.reset {
            background-color: $danger;
          }
        }
      }
    }
  }
</style>
