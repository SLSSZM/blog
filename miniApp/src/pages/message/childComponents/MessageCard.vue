<template>
  <view class="message-card">
    <view class="header">
      <image class="avatar" src="/static/logo.png" />
      <view class="info">
        <view class="name">{{ props.value.name }}</view>
        <view class="time">{{ dayjs(props.value.createdAt).fromNow() }}</view>
      </view>
    </view>
    <view class="content">邮箱：{{ props.value.email }}</view>
    <view class="content">留言： {{ props.value.content }} </view>
    <button @click="handlerDelete">删除</button>
  </view>
</template>

<script setup lang="ts">
  import { Message, deleteMessageApi } from '../../../network/api';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');
  interface Props {
    value: Message;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: () => ({
      name: '',
      createdAt: '',
      email: '',
      content: '',
    }),
  });
  const emits = defineEmits<{
    (e: 'deleteSuccess'): void;
  }>();
  const handlerDelete = async (): Promise<void> => {
    await deleteMessageApi(props.value._id!);
    emits('deleteSuccess');
    uni.showToast({
      title: '删除成功',
      icon: 'success',
    });
  };
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
