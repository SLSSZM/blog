<template>
  <view class="message">
    <message-card
      v-for="(item, index) in list.data"
      :key="item._id"
      :value="item"
      @delete-success="deleteSuccess(index)"
    />
  </view>
</template>

<script setup lang="ts">
  import MessageCard from './childComponents/MessageCard.vue';
  import { fetchMessageApi, Message } from '../../network/api/index';
  import { reactive, ref } from 'vue';
  import { onPullDownRefresh, onReachBottom, onTabItemTap } from '@dcloudio/uni-app';
  let page = ref<number>(1);
  let count = ref<number>(4);
  let list = reactive<{ data: Message[] }>({
    data: [],
  });
  const fetchList = async (): Promise<void> => {
    const res = await fetchMessageApi({
      data: {
        page: page.value,
        count: count.value,
      },
    });
    // list.data = res.data;
    Array.prototype.push.apply(list.data, res.data);
    page.value++;
  };
  fetchList();

  onPullDownRefresh(() => {
    page.value = 1;
    fetchList();
    list.data = [];
    uni.stopPullDownRefresh();
  });
  onReachBottom(() => {
    fetchList();
  });
  const deleteSuccess = (index: number): void => {
    list.data.splice(index, 1);
  };
</script>

<style scoped lang="scss">
  .message {
    height: calc(100vh - 40rpx * 2);
    padding: 40rpx;
    background-color: $bg;
  }
</style>
