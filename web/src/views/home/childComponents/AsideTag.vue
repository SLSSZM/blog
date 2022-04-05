<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import SlTag from '@/components/slTag/SlTag.vue';
  import { Tag } from '@/network/api';
  interface Props {
    list?: Tag[];
  }
  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
  });
</script>
<template>
  <chunk class="aside-tag" color>
    <div class="title">文章标签</div>
    <div class="tip">点击标签搜索文章</div>
    <div class="list">
      <sl-tag v-for="item in props.list" :key="item._id" plain>{{ item.name }}</sl-tag>
    </div>
  </chunk>
</template>

<style scoped lang="scss">
  .aside-tag {
    padding: 20px;
    .tip {
      margin: 10px;
      font-size: 12px;
      color: var(--danger);
      opacity: 0.8;
    }
    .title {
      text-align: center;
      font-size: 17px;
    }
    .list {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
