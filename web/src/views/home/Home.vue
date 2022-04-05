<script setup lang="ts">
  import Sentence from './childComponents/Sentence.vue';
  import ChunkTitle from '@/components/chunk/ChunkTitle.vue';
  import SlSearch from '../../components/slSearch/SlSearch.vue';
  import ArticleCard from './childComponents/ArticleCard.vue';
  import AsideTag from './childComponents/AsideTag.vue';
  import { fetchConfigApi } from '@/network/api';
  import { onMounted, reactive } from 'vue';

  let configData = reactive<{ data: any }>({ data: {} });
  onMounted(async (): Promise<void> => {
    const res = await fetchConfigApi();
    configData.data = res.data;
    localStorage.setItem('CONFIG', JSON.stringify(res.data));
  });
</script>

<template>
  <div class="home">
    <sentence class="sentence" />
    <chunk-title>
      <template #title>最新文章</template>
      <sl-search />
    </chunk-title>
    <div class="home-body">
      <div class="home-content">
        <article-card
          class="article-card"
          v-for="item in configData.data.articles"
          :key="item._id"
          :value="item"
        />
      </div>
      <div class="home-aside">
        <aside-tag :list="configData.data.tags" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home {
    width: 100%;
    .sentence {
      margin-bottom: 10px;
    }
    .home-body {
      display: flex;
      .home-content {
        width: 65%;
        .article-card {
          margin-bottom: 30px;
        }
      }
      .home-aside {
        margin-left: 30px;
        flex: 1;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .home {
      .home-content {
        width: 100% !important;
      }
      .home-aside {
        display: none;
      }
    }
  }
</style>
