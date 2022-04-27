<script setup lang="ts">
  import Sentence from './childComponents/Sentence.vue';
  import ChunkTitle from '@/components/chunk/ChunkTitle.vue';
  import SlSearch from '../../components/slSearch/SlSearch.vue';
  import ArticleCard from './childComponents/ArticleCard.vue';
  import AsideTag from './childComponents/AsideTag.vue';
  import { Article, fetchHomeApi } from '@/network/api';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useConfigStore } from '@/store/config';

  let homeData = reactive<{ data: Article[] }>({ data: [] });
  const fetchList = async (): Promise<void> => {
    const res = await fetchHomeApi();
    homeData.data = res.data;
  };
  fetchList();
  const router = useRouter();
  const configState = useConfigStore();
</script>

<template>
  <div class="home">
    <sentence class="sentence" />
    <chunk-title>
      <template #title>最新文章</template>
      <sl-search @search="router.push({ name: 'Article', params: { title: $event } })" />
    </chunk-title>
    <div class="home-body">
      <div class="home-content">
        <article-card
          class="article-card"
          v-for="item in homeData.data"
          :key="item._id"
          :value="item"
        />
        <div class="show-all-article" @click="router.push({ name: 'Article' })">
          点击查看更多文章
        </div>
      </div>
      <div class="home-aside">
        <aside-tag :list="configState.configData.tags" />
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
        .show-all-article {
          padding: 12px;
          margin: 30px 0;
          text-align: center;
          color: var(--fct);
          cursor: pointer;
          border-radius: var(--br);
          background-color: var(--hover);
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
