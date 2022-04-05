<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import SlButton from '@/components/slButton/SlButton.vue';
  interface Props {
    value?: {
      name: string;
      avatar: string;
      message: string;
      time: string;
    };
  }
  const props = withDefaults(defineProps<Props>(), {
    value: () => ({
      name: '',
      avatar: '',
      message: '',
      time: '',
    }),
  });
</script>

<template>
  <chunk class="message-card">
    <div class="header">
      <img src="@/assets/logo.png" />
      <div class="info">
        <div class="name">山岚设色</div>
        <div class="time">2022-01-03 20:56</div>
      </div>
    </div>
    <div class="content">
      <div class="message">留言测试留言测试留言测试</div>
      <!-- <div class="comment-button">
        <sl-button icon="&#xe618;">评论</sl-button>
      </div> -->
    </div>
  </chunk>
</template>

<style scoped lang="scss">
  .message-card {
    padding: 20px;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 15px;
        border: 1px solid var(--bc);
      }
      .name {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .time {
        font-size: 13px;
        color: var(--fct);
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .message {
        flex: 1;
        padding-right: 20px;
      }
      .comment-button {
        height: 100%;
        align-self: flex-end;
        width: 80px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .message-card {
      .header {
        img {
          width: 40px;
          height: 40px;
        }
        .name {
          font-size: 15px;
        }
      }
      .content {
        .message {
          font-size: 14px;
        }
      }
    }
  }
</style>
