<script setup lang="ts">
  import { ThemeType, useThemeStore } from '@/store/theme';

  const themeStore = useThemeStore();

  interface Props {
    color?: boolean;
    miniColor?: boolean;
    rightAngle?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    color: false,
    miniColor: false,
  });
</script>

<template>
  <div
    :class="[
      'chunk',
      { color: props.color },
      { miniColor: props.miniColor },
      { rightAngle: props.rightAngle },
      { dark: props.miniColor && themeStore.theme === ThemeType.Dark },
    ]"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .chunk {
    border-radius: var(--br);
    overflow: hidden;
    &.color {
      background-color: var(--bgc);
    }
    &.rightAngle {
      border-radius: 0;
    }
  }
  @media screen and (max-width: 1200px) {
    .chunk {
      &.miniColor {
        background-color: var(--bg);
      }
      &.dark {
        background-color: var(--bg);
      }
    }
  }
</style>
