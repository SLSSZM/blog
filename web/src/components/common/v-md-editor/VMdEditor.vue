<script setup lang="ts">
  import VMdPreview from '@kangc/v-md-editor/lib/preview';
  import '@kangc/v-md-editor/lib/style/preview.css';
  import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
  import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

  import Prism from 'prismjs';
  import 'prismjs/components/prism-json.min';
  import 'prismjs/components/prism-javascript.min';
  import 'prismjs/components/prism-css.min';
  import 'prismjs/components/prism-typescript.min';
  import 'prismjs/components/prism-sass.min';
  // code copy
  import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
  import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
  // code hight
  import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
  import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
  // todo-list
  import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
  import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
  import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
  import { onMounted, ref, watch } from 'vue';
  VMdPreview.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
      vue: 'html',
    },
    config: {
      toc: {
        includeLevel: [1, 2, 3, 4],
      },
    },
  });
  VMdPreview.use(createCopyCodePlugin());
  VMdPreview.use(createHighlightLinesPlugin());
  VMdPreview.use(createTodoListPlugin());
  VMdPreview.use(createAlignPlugin());

  interface Props {
    value?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
  });
  let text = ref<string>('');
  onMounted((): void => {
    text.value = props.value;
  });
  watch(
    () => props.value,
    (value: string) => {
      text.value = value;
    }
  );
</script>

<template>
  <v-md-preview :text="text" height="400px"></v-md-preview>
</template>

<style scoped lang="scss">
  :deep(.vuepress-markdown-body) {
    background-color: transparent;
    color: var(--fc);
    min-width: 0;
    .v-md-plugin-tip {
      background-color: var(--bg);
      opacity: 0.8;
    }
    div[class*='v-md-pre-wrapper-'] {
      margin: 0 !important;
      border-radius: 6px !important;
    }
    &:not(.custom) {
      padding: 0 !important;
    }
  }
</style>
