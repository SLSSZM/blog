<script setup lang="ts">
  import { useSlots } from 'vue';
  import { useRouter } from 'vue-router';

  interface Props {
    plain?: boolean;
    mini?: boolean;
    active?: boolean;
    hoverColor?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    plain: false,
    mini: false,
    active: false,
    hoverColor: false,
  });
</script>

<template>
  <span
    class="sl-tag hover"
    :class="{
      plain: props.plain,
      mini: props.mini,
      active: props.active && props.plain,
      hoverColor: props.hoverColor,
    }"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
  .sl-tag {
    padding: 5px 10px;
    margin: 5px 10px 5px 0px;
    border-radius: 5px;
    background-color: var(--danger);
    color: #fff;
    transition: background-color 0.3s;
    font-size: 15px;
    &:hover {
      background-color: var(--danger);
      color: #fff !important;
    }
    &.plain {
      border: var(--danger);
      color: var(--danger);
      background-color: var(--danger_plain);
      &:hover {
        color: var(--danger) !important;
        &.hoverColor {
          background-color: var(--danger);
          color: #fff !important;
        }
      }
    }
    &.mini {
      padding: 4px 6px;
      font-size: 13px;
    }
    &.active {
      background-color: var(--danger);
      color: #fff !important;
      &:hover {
        color: #fff !important;
      }
    }
  }
</style>
