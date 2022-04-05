<template>
  <view class="message">
    <message-card />
    <message-card />
  </view>
</template>

<script setup lang="ts">
  import MessageCard from './childComponents/MessageCard.vue';
</script>

<style scoped lang="scss">
  .message {
    height: calc(100vh - 40rpx * 2);
    padding: 40rpx;
    background-color: $bg;
  }
</style>
