<script setup lang="ts">
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import SlTag from '@/components/slTag/SlTag.vue';
  import SlButton from '@/components/slButton/SlButton.vue';
  import Chunk from '@/components/chunk/Chunk.vue';
  import { transformChineseTime } from '@/utils/time';
  import { useRouter } from 'vue-router';
  import { Article } from '@/network/api';
  import { ref } from 'vue';

  interface Props {
    value?: Article;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: () => ({
      _id: '',
      image: '',
      title: '',
      createdAt: '',
      description: '',
      views: 0,
      tag: [],
    }),
  });
  const router = useRouter();
  const dumpAriticleInfo = (): void => {
    router.push({ name: 'Info', query: { id: props.value._id } });
  };
  let description = ref<string>(props.value.description || '');
  if (description.value.length > 100) {
    description.value = description.value.slice(0, 100) + '...';
  }
</script>

<template>
  <chunk class="article-card" color mini-color>
    <div class="image" v-if="props.value.image" @click="dumpAriticleInfo">
      <img :src="props.value.image" alt="image" />
    </div>
    <div class="body">
      <h3 class="title" @click="dumpAriticleInfo">{{ props.value.title }}</h3>
      <div class="date fct">{{ transformChineseTime(props.value.createdAt!) }}</div>
      <p class="description">{{ description }}</p>
      <div class="tag">
        <sl-tag plain mini v-for="item in props.value.tag" :key="item._id">{{ item.name }}</sl-tag>
      </div>
      <div class="bottom">
        <sl-button type="danger" plain @click="dumpAriticleInfo">开始阅读</sl-button>
        <div class="views flex-c">
          <iconfont class="icon fct" icon="&#xe641;" />
          <span class="fct">{{ props.value.views }}</span>
        </div>
      </div>
    </div>
  </chunk>
</template>

<style scoped lang="scss">
  .article-card {
    width: 100%;
    > .image {
      cursor: pointer;
      img {
        object-fit: cover;
        width: 100%;
        max-height: 300px;
      }
    }
    > .body {
      padding: 10px 20px;
      > .title {
        margin: 0;
        font-weight: normal;
        font-size: 20px;
        margin-bottom: 15px;
        margin-top: 5px;
        cursor: pointer;
      }
      > .date {
        font-size: 14px;
        margin-bottom: 20px;
      }
      > .description {
        margin-bottom: 20px;
        font-size: 15px;
        letter-spacing: 1px;
        opacity: 0.9;
      }
      > .tag {
        margin-bottom: 20px;
      }
      > .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .views {
          font-size: 16px;
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .article-card {
      .body {
        .title {
          font-size: 18px;
        }
        .description {
          font-size: 14px;
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    .article-card {
      .body {
        .description {
          font-size: 14px;
        }
      }
    }
  }
</style>
