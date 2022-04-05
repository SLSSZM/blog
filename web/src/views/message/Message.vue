<script setup lang="ts">
  import MessageCard from './childComponents/MessageCard.vue';
  import MessageInput from './childComponents/MessageInput.vue';
  import Chunk from '@/components/chunk/Chunk.vue';
</script>

<template>
  <div class="message">
    <message-input />
    <chunk color class="message-list">
      <message-card class="message-card" />
      <message-card class="message-card" />
      <message-card class="message-card" />
      <message-card class="message-card" />
    </chunk>
  </div>
</template>

<style scoped lang="scss">
  .message {
    width: 90%;
    min-width: 700px;
    margin: 0 5%;
    .message-list {
      margin: 10px;
      .message-card {
        position: relative;
        &::after {
          content: '';
          height: 2px;
          width: 95%;
          position: absolute;
          bottom: 0;
          background-color: var(--bc);
        }
        &:last-child {
          &::after {
            height: 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .message {
      width: 100%;
      min-width: auto;
      margin: 0;
    }
  }
</style>
