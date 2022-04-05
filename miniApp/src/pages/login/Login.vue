<template>
  <view class="login">
    <view class="h1"><text>山岚设</text>色</view>
    <form @submit="handlerSubmit" class="form">
      <view class="form-item">
        <input placeholder="请输入账号" />
      </view>
      <view class="form-item">
        <input placeholder="请输入密码" />
      </view>
      <view class="form-item button-group">
        <button class="reset">清空</button>
        <button>登录</button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
  const handlerSubmit = (data: any): void => {
    console.log(data);
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
