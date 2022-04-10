<script setup lang="ts">
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  import { onMounted, ref, watch } from 'vue';
  interface Props {
    height?: string;
    iconSize?: string;
    text?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    height: '40px',
    iconSize: '24px',
    text: '',
  });
  let text = ref<string>('');
  watch(
    (): string => props.text,
    (value: string): void => {
      text.value = value;
    }
  );
  const emits = defineEmits<{
    (e: 'search', value: string): void;
  }>();
</script>

<template>
  <div class="search flex-c">
    <input
      type="text"
      placeholder="请输入标题"
      v-model="text"
      @keydown.enter="emits('search', text)"
    />
    <iconfont class="search-icon fct hover" icon="&#xe651;" @click="emits('search', text)" />
  </div>
</template>

<style scoped lang="scss">
  .search {
    height: v-bind('props.height');
    padding-right: 10px;
    cursor: pointer;
    border-radius: 100px;
    background-color: var(--grey_t);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    > input {
      flex: 1;
      height: 100%;
      padding: 15px;
      border: none;
      outline: none;
      font-size: 16px;
      background-color: transparent;
      border-radius: inherit;
      color: var(--fct);
    }
    .search-icon {
      padding: 3px;
      background-color: var(--hover);
      font-size: v-bind('props.iconSize');
      border-radius: 200px;
    }
  }
  @media screen and (max-width: 750px) {
    .search {
      > input {
        width: 100px;
      }
    }
  }
</style>
