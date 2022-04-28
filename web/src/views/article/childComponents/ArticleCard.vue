<script setup lang="ts">
  import slTag from '@/components/slTag/SlTag.vue';
  import slButton from '@/components/slButton/SlButton.vue';
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import Chunk from '@/components/chunk/Chunk.vue';
  import { useRouter } from 'vue-router';
  import { Article } from '@/network/api';
  import { transformChineseTime } from '@/utils/time';
  import { ref } from 'vue';
  interface Props {
    value?: Article;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: () => ({
      description: '',
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
  <chunk class="card" @click.stop="dumpAriticleInfo">
    <div class="image" v-if="props.value.image">
      <img :src="props.value.image" alt="image" />
    </div>
    <div class="body">
      <h3 class="title">{{ props.value.title }}</h3>
      <div class="date fct">{{ transformChineseTime(props.value.createdAt as string) }}</div>
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
  .card {
    padding: 15px 10px;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    .image {
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 300px;
        height: 100%;
        max-height: 300px;
        object-fit: cover;
        object-position: center;
        border-radius: var(--br);
      }
    }
    > .body {
      max-height: 300px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: space-between;
      > .title {
        margin: 0;
        font-size: 20px;
        margin-bottom: 10px;
        margin-top: 10px;
        cursor: pointer;
      }
      > .date {
        font-size: 14px;
      }
      > .description {
        min-height: 30px;
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
        .views {
          font-size: 16px;
          padding-right: 10px;
          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .card {
      .image {
        display: none;
      }
      .body {
        width: 100%;
        .title {
          font-size: 18px;
        }
        .description {
          font-size: 13px;
          min-height: 0;
        }
        .bottom {
          display: none;
        }
      }
    }
  }
</style>
