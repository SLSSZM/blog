<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import ChunkTitle from '@/components/chunk/ChunkTitle.vue';
  import SlButton from '@/components/slButton/SlButton.vue';
  import { fetchSentence } from '@/network/api';
  import { onMounted, reactive } from 'vue';

  interface SenTence {
    from: string;
    hitokoto: string;
    from_who: string;
  }
  let sentence = reactive<{ data: SenTence }>({
    data: {
      from: '',
      hitokoto: '',
      from_who: '',
    },
  });
  let timer: any = undefined;
  const changeSentence = async (): Promise<void> => {
    try {
      const res = await fetchSentence();
      sentence.data = res;
    } catch (err) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        changeSentence();
      }, 1000);
    }
  };
  onMounted(async (): Promise<void> => {
    changeSentence();
  });
</script>

<template>
  <chunk class="sentence">
    <chunk-title>
      <template #title>诗词一言</template>
      <sl-button icon="&#xe626;" round @click="changeSentence">切换一言</sl-button>
    </chunk-title>
    <chunk color class="chunk-card mock">
      <div class="content">{{ sentence.data.hitokoto }}</div>
      <div class="title" v-if="sentence.data.from">- 标题： {{ sentence.data.from }}</div>
      <div class="author" v-if="sentence.data.from_who">- 作者： {{ sentence.data.from_who }}</div>
    </chunk>
  </chunk>
</template>

<style scoped lang="scss">
  .chunk-card {
    height: 300px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    color: #fff;
    background-image: url(@/assets/images/sentence.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .content {
      font-weight: bold;
      font-size: 21px;
      position: relative;
      z-index: 2;
    }
    .title,
    .author {
      margin-top: 10px;
      text-align: end;
      font-size: 18px;
      position: relative;
      z-index: 2;
    }
  }
  @media screen and (max-width: 1200px) {
    .chunk-card {
      height: 260px;
      .content {
        font-size: 18px;
      }
      .title,
      .author {
        font-size: 15px;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .chunk-card {
      height: 200px;
    }
  }
</style>
