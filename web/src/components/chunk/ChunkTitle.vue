<template>
  <div class="chunk-title">
    <div class="title"><slot name="title" /></div>
    <div class="content"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
  .chunk-title {
    padding: 10px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 19px;
    }
  }
  @media screen and (max-width: 1200px) {
    .chunk-title {
      .title {
        font-size: 18px;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .chunk-title {
      .title {
        font-size: 16px;
      }
    }
  }
</style>
