<template>
  <view class="message-card">
    <view class="header">
      <image class="avatar" src="/static/logo.png" />
      <view class="info">
        <view class="name">{{ title }}</view>
        <view class="time">{{ time }}</view>
      </view>
    </view>
    <view class="content">邮箱：211722662@qq.com</view>
    <view class="content">留言： 留言测试留言测试 </view>
    <button>删除</button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const title = ref<string>('山岚设色');
  const time = ref<string>('2022-04-02 10:45:32');
</script>

<style scoped lang="scss">
  .message-card {
    padding: 40rpx;
    background-color: $bgc;
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 40rpx;
    .header {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
        height: 100rpx;
        width: 100rpx;
      }
      .info {
        margin-left: 30rpx;
        .name {
          font-size: 36rpx;
          margin-bottom: 10rpx;
        }
        .time {
          color: #999;
          font-size: 26rpx;
        }
      }
    }
    .content {
      margin: 20rpx 10rpx;
    }
    button {
      height: 60rpx;
      width: 80%;
      line-height: 60rpx;
      font-size: 30rpx;
      border: none;
      outline: none;
      background-color: $danger;
      color: #fff;
    }
  }
</style>
