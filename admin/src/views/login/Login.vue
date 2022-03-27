<script setup lang="ts">
  import { inject, ref, Ref } from 'vue';
  import FormCard from './childComponents/FormCard.vue';

  const clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));
</script>

<template>
  <div class="login">
    <div class="card" v-if="clientLevel === 1">
      <form-card />
    </div>
    <form-card class="box-shadow" v-else />
  </div>
</template>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .card {
      width: 1000px;
      height: 450px;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px 3px rgba($color: #000000, $alpha: 0.1);
      overflow: hidden;
      background-color: $background_color_content;
      background-image: url('@/assets/images/login.png');
      background-size: contain;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .box-shadow {
    padding: 30px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px 3px rgba($color: #000000, $alpha: 0.1);
  }
</style>
