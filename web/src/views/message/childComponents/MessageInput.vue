<script setup lang="ts">
  import Chunk from '@/components/chunk/Chunk.vue';
  import SlButton from '@/components/slButton/SlButton.vue';
</script>

<template>
  <div class="message-input">
    <chunk class="input-card" color mini-color>
      <div class="info">
        <input type="text" placeholder="名称（必填）" />
        <input type="text" placeholder="邮箱（必填）" />
      </div>
      <textarea rows="8" placeholder="不要默默看了，快来评论下！！"></textarea>
    </chunk>
    <div class="tip">
      <span>如果觉得网址有需要改进的地方或文章有问题，也可在这里进行留言</span>
      <sl-button type="primary" class="sl-button">提交</sl-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .message-input {
    padding: 10px;
    .input-card {
      margin-bottom: 10px;
      .info {
        padding: 5px;
        input {
          padding: 15px 10px;
          border: none;
          outline: none;
          width: calc(60% - 20px);
          background-color: transparent;
          color: var(--fc);
          border-bottom: 1px solid var(--bc);
          &:first-child {
            width: calc(40% - 21px);
            border-right: 1px solid var(--bc);
          }
        }
      }
      textarea {
        width: calc(100% - 20px);
        padding: 10px;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--fc);
        resize: none;
      }
    }
    .tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 13px;
        color: var(--fct);
        padding-right: 10px;
      }
      .sl-button {
        width: 120px;
        height: 35px;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .input-card {
      .info {
        input {
          font-size: 14px;
          width: calc(100% - 20px) !important;
          border-right: none !important;
        }
      }
      textarea {
        font-size: 14px;
      }
    }
  }
</style>
