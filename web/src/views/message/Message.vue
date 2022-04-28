<script setup lang="ts">
  import MessageCard from './childComponents/MessageCard.vue';
  import MessageInput from './childComponents/MessageInput.vue';
  import Chunk from '@/components/chunk/Chunk.vue';
  import { ref, reactive, watch } from 'vue';
  import { fetchMessage, Message } from '@/network/api';
  import { useConfigStore } from '@/store/config';

  let list = reactive<{ data: Message[] }>({ data: [] });
  let page = ref<number>(1);
  let count = ref<number>(6);
  let isAddMessage = ref<boolean>(true);
  const fetchData = async (): Promise<void> => {
    const res = await fetchMessage({
      page: page.value,
      count: count.value,
    });
    Array.prototype.push.apply(list.data, res.data.list || []);
    // 如果列表等于数量，则不在请求
    if (res.data.total <= list.data.length) {
      isAddMessage.value = false;
    }
  };
  fetchData();

  const configState = useConfigStore();
  const handlerAddMessage = (): void => {
    page.value++;
    fetchData();
  };
  watch(
    () => configState.isScrollBottom,
    (value: boolean) => {
      value && isAddMessage.value && handlerAddMessage();
    }
  );
  const handlerRefresh = (): void => {
    page.value = 1;
    list.data = [];
    fetchData();
  };
</script>

<template>
  <div class="message">
    <message-input @success="handlerRefresh" />
    <chunk color class="message-list">
      <message-card class="message-card" v-for="item in list.data" :key="item._id" :value="item" />
    </chunk>
    <div v-if="!isAddMessage || !list.data.length" class="notArticle">暂无更多留言~</div>
  </div>
</template>

<style scoped lang="scss">
  .message {
    width: 90%;
    min-width: 700px;
    margin: 0 5%;
    .message-list {
      margin: 10px;
      .message-card {
        position: relative;
        &::after {
          content: '';
          height: 2px;
          width: 95%;
          position: absolute;
          bottom: 0;
          background-color: var(--bc);
        }
        &:last-child {
          &::after {
            height: 0;
          }
        }
      }
    }
    .notArticle {
      margin: 30px 0;
      text-align: center;
    }
  }
  @media screen and (max-width: 1200px) {
    .message {
      width: 100%;
      min-width: auto;
      margin: 0;
    }
  }
</style>
