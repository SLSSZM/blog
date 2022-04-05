<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import ChunkTitle from '@/components/chunk/ChunkTitle.vue';
  import ArticleCard from './childComponents/ArticleCard.vue';
  import SlSearch from '@/components/slSearch/SlSearch.vue';
  import SlTag from '@/components/slTag/SlTag.vue';
  import { onMounted, reactive, ref } from 'vue';
  import { fetchArticle, Article, Tag } from '@/network/api';

  let tagList = reactive<{ data: Tag[] }>({ data: [] });
  let articleList = reactive<{ data: Article[] }>({ data: [] });
  let selectTagList = reactive<{ data: string[] }>({ data: [] });
  const fetchData = async (title?: string): Promise<void> => {
    const res = await fetchArticle({
      title,
      tag: JSON.stringify(selectTagList.data) as unknown as Tag[],
    });
    articleList.data = res.data;
  };
  onMounted((): void => {
    tagList.data = JSON.parse(localStorage.getItem('CONFIG') as string).tags;
    fetchData();
  });
  const selectTag = (name: string): void => {
    const index = selectTagList.data.indexOf(name);
    if (index > -1) {
      selectTagList.data.splice(index);
    } else {
      selectTagList.data.push(name);
    }
    fetchData();
  };
</script>
<template>
  <chunk class="article">
    <chunk class="search-article" color>
      <sl-search
        class="article-search"
        height="50px"
        icon-size="30px"
        @search="fetchData($event)"
      ></sl-search>
      <div class="article-tag">
        标签：
        <sl-tag
          v-for="item in tagList.data"
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
    <chunk color>
      <article-card
        class="article-card"
        v-for="item in articleList.data"
        :key="item._id"
        :value="item"
      />
    </chunk>
  </chunk>
</template>

<style scoped lang="scss">
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
  @media screen and (max-width: 1200px) {
    .article-card {
      margin-bottom: 0;
    }
  }
</style>
