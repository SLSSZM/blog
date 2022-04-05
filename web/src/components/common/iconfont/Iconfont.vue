<script setup lang="ts">
  interface Props {
    icon: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    icon: '',
  });
</script>

<template>
  <i class="iconfont" @touchstart="false">{{ props.icon }}</i>
</template>

<style scoped lang="scss">
  .iconfont {
    display: inline-block;
    color: var(--fc);
    font-size: 24px;
    text-align: center;
    vertical-align: middle;
    line-height: 1em;
    width: 1em;
    height: 1em;
  }
</style>
