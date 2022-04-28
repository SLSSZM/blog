<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import ChunkTitle from '@/components/chunk/ChunkTitle.vue';
  import ArticleCard from './childComponents/ArticleCard.vue';
  import SlSearch from '@/components/slSearch/SlSearch.vue';
  import SlTag from '@/components/slTag/SlTag.vue';
  import { reactive, ref, watch } from 'vue';
  import { fetchArticle, Article, Tag } from '@/network/api';
  import { useRoute } from 'vue-router';
  import { useConfigStore } from '@/store/config';

  const configState = useConfigStore();
  let list = reactive<{ data: Article[] }>({ data: [] });
  let selectTagList = reactive<{ data: string[] }>({ data: [] });
  let selectTitle = ref<string>('');
  let page = ref<number>(1);
  let count = ref<number>(5);
  let isAddArticle = ref<boolean>(true);

  const fetchData = async (): Promise<void> => {
    const res = await fetchArticle({
      title: selectTitle.value,
      tag: JSON.stringify(selectTagList.data) as unknown as Tag[],
      page: page.value,
      count: count.value,
    });
    Array.prototype.push.apply(list.data, res.data.list || []);
    // 如果列表等于数量，则不在请求
    if (res.data.total <= list.data.length) {
      isAddArticle.value = false;
    }
  };

  const route = useRoute();
  const routeTag: string = route.params.tag as string;
  const routeTitle: string = route.params.title as string;
  if (routeTag) {
    selectTagList.data = [routeTag];
  } else if (routeTitle) {
    selectTitle.value = routeTitle;
  }
  fetchData();

  const selectTag = (name: string): void => {
    const index = selectTagList.data.indexOf(name);
    if (index > -1) {
      selectTagList.data.splice(index, 1);
    } else {
      selectTagList.data.push(name);
    }
    page.value = 1;
    list.data = [];
    fetchData();
  };
  const handlerSearch = (title: string): void => {
    selectTitle.value = title;
    page.value = 1;
    list.data = [];
    fetchData();
  };
  const handlerAddArticle = (): void => {
    page.value++;
    fetchData();
  };
  watch(
    () => configState.isScrollBottom,
    (value: boolean) => {
      value && isAddArticle.value && handlerAddArticle();
    }
  );
</script>
<template>
  <chunk class="article">
    <chunk class="search-article" color>
      <sl-search
        class="article-search"
        height="50px"
        icon-size="30px"
        :text="selectTitle"
        @search="handlerSearch"
      ></sl-search>
      <div class="article-tag">
        标签：
        <sl-tag
          v-for="item in configState.configData.tags"
          :key="item._id"
          plain
          @click="selectTag(item.name)"
          :active="selectTagList.data.indexOf(item.name) > -1"
        >
          {{ item.name }}
        </sl-tag>
      </div>
      <div class="article-list"></div>
    </chunk>
    <chunk-title>
      <template #title>全部文章</template>
    </chunk-title>
    <chunk color v-if="list.data.length">
      <article-card class="article-card" v-for="item in list.data" :key="item._id" :value="item" />
    </chunk>
    <div v-if="!isAddArticle || !list.data.length" class="notArticle">暂无更多文章~</div>
  </chunk>
</template>

<style scoped lang="scss">
  .article {
    margin-bottom: 30px;
  }
  .search-article {
    margin: 10px 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .article-search {
      width: 80%;
    }
    .article-tag {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
  .article-card {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      background-color: var(--bc);
      width: 95%;
    }
    &:last-child {
      &::after {
        height: 0;
      }
    }
  }
  .notArticle {
    margin: 30px 0;
    text-align: center;
  }
  @media screen and (max-width: 1200px) {
    .article-card {
      margin-bottom: 0;
    }
  }
</style>
