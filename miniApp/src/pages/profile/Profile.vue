<template>
  <view class="profile">
    <image class="avatar" src="/static/logo.png" />
    <view class="name">admin</view>
    <button @click="loginOut">退出登录</button>
  </view>
</template>

<script setup lang="ts">
  import { loginoutApi } from '../../network/api';
  const loginOut = async (): Promise<void> => {
    await loginoutApi();
    uni.removeStorageSync('token');
    uni.redirectTo({
      url: '/pages/login/Login',
    });
  };
</script>

<style scoped lang="scss">
  .profile {
    width: 100%;
    background-color: $bg;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      margin: 30rpx;
      width: 260rpx;
      height: 260rpx;
      border-radius: 50%;
      box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.2);
    }
    .name {
      font-size: 40rpx;
      margin: 30rpx;
    }
    button {
      margin: 60rpx 0 0;
      width: 60%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      background-color: $danger;
      color: #fff;
      border: none;
      outline: none;
    }
  }
</style>
