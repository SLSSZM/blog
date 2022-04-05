<script setup lang="ts">
  import Iconfont from '@/components/common/iconfont/Iconfont.vue';
  interface Props {
    plain?: boolean;
    type?: 'danger' | 'primary' | '';
    size?: 'mini' | '';
    icon?: string;
    round?: boolean;
    text?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    plain: false,
    round: false,
    text: false,
    type: '',
    size: '',
    icon: '',
  });
</script>

<template>
  <button
    :class="[
      'sl-button',
      'flex-c',
      {
        plain: props.plain,
        [props.type]: props.type,
        [props.size]: props.size,
        round: props.round,
        text: props.text,
      },
    ]"
  >
    <iconfont class="button-icon fct" v-if="props.icon" :icon="props.icon" />
    <span class="button-text fct">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
  .sl-button {
    display: inline-block;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 8px 13px;
    background-color: var(--grey_t);
    border-radius: 5px;
    transition: 0.2s;
    font-size: 15px;
    .button-icon {
      font-size: 16px;
      margin-right: 3px;
    }
    &:hover {
      transform: scale(1.05);
      background-color: var(--grey);
      .button-icon,
      .button-text {
        color: var(--fc) !important;
      }
    }
    &.round {
      border-radius: var(--br) !important;
    }
    &.text {
      background-color: transparent !important;
      &:hover {
        background-color: var(--hover) !important;
      }
    }
    &.danger {
      background-color: var(--danger);
      .button-icon,
      .button-text {
        color: #fff !important;
      }
      &:hover {
        opacity: 0.8;
      }
      &.plain {
        background-color: var(--danger_plain);
        .button-icon,
        .button-text {
          color: var(--danger) !important;
        }
        &:hover {
          background-color: var(--danger);
          .button-icon,
          .button-text {
            color: var(--danger);
            color: #fff !important;
          }
        }
      }
      &.text {
        background-color: transparent !important;
        .button-icon,
        .button-text {
          color: var(--danger) !important;
        }
        &:hover {
          background-color: var(--danger_plain) !important;
        }
      }
    }
    &.primary {
      background-color: var(--primary);
      .button-icon,
      .button-text {
        color: #fff !important;
      }
      &:hover {
        opacity: 0.8;
      }
      &.plain {
        background-color: var(--primary_plain);
        .button-icon,
        .button-text {
          color: var(--primary) !important;
        }
        &:hover {
          background-color: var(--primary);
          .button-icon,
          .button-text {
            color: var(--primary);
            color: #fff !important;
          }
        }
      }
      &.text {
        background-color: transparent !important;
        .button-icon,
        .button-text {
          color: var(--primary) !important;
        }
        &:hover {
          background-color: var(--primary_plain) !important;
        }
      }
    }
  }
</style>
