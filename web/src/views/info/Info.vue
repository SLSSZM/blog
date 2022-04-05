<script setup lang="ts">
  import VMdEditor from '@/components/common/v-md-editor/VMdEditor.vue';
  import { useRoute, useRouter } from 'vue-router';
  import Chunk from '@/components/chunk/Chunk.vue';
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import { onMounted, reactive } from 'vue';
  import { fetchArticleOne, Article } from '@/network/api';

  const route = useRoute();
  const router = useRouter();
  const article = reactive<{ data: Article }>({ data: {} });
  onMounted(async (): Promise<void> => {
    const id = route.query.id as string;
    const res = await fetchArticleOne(id);
    article.data = res.data;
  });
</script>
<template>
  <div>
    <div class="header" @click="router.go(-1)">
      <iconfont class="fct" icon="&#xe62f;" />
      <span>返回</span>
    </div>
    <chunk class="info" color>
      <div class="image" v-if="article.data.image">
        <img src="@/assets/images/sentence.jpg" />
      </div>
      <div class="text">
        <h1>{{ article.data.title }}</h1>
        <p>{{ article.data.description }}</p>
      </div>
      <v-md-editor :value="article.data.body" />
    </chunk>
  </div>
</template>

<style scoped lang="scss">
  .header {
    width: calc(100% - 26px);
    height: 35px;
    margin: 10px 3px;
    padding: 10px;
    background-color: var(--bgc);
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 8px;
    color: var(--fct);
    cursor: pointer;
    position: relative;
    &:hover {
      box-shadow: none;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .info {
    .image {
      img {
        object-fit: cover;
        width: 100%;
      }
    }
    .text {
      padding: 0 40px;
      h1 {
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .header {
      height: 25px;
    }
  }
  @media screen and (max-width: 750px) {
    .header {
      height: 20px;
    }
  }
</style>
