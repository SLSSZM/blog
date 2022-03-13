<script setup lang="ts">
  // http://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D
  import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
  import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
  import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
  import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

  import Prism from 'prismjs';
  import 'prismjs/components/prism-json.min';
  import 'prismjs/components/prism-javascript.min';
  import 'prismjs/components/prism-css.min';
  import 'prismjs/components/prism-typescript.min';
  import 'prismjs/components/prism-sass.min';

  // codemirror 编辑器的相关资源
  import Codemirror from 'codemirror';
  // mode
  import 'codemirror/mode/markdown/markdown';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/css/css';
  import 'codemirror/mode/htmlmixed/htmlmixed';
  import 'codemirror/mode/vue/vue';
  // edit
  import 'codemirror/addon/edit/closebrackets';
  import 'codemirror/addon/edit/closetag';
  import 'codemirror/addon/edit/matchbrackets';
  // placeholder
  import 'codemirror/addon/display/placeholder';
  // active-line
  import 'codemirror/addon/selection/active-line';
  // scrollbar
  import 'codemirror/addon/scroll/simplescrollbars';
  import 'codemirror/addon/scroll/simplescrollbars.css';
  // style
  import 'codemirror/lib/codemirror.css';
  import { ref, watch } from 'vue';
  // code copy
  import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
  import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
  // code line
  import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
  // code hight
  import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
  import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
  // todo-list
  import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
  import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
  import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

  VMdEditor.Codemirror = Codemirror;
  VMdEditor.use(vuepressTheme, {
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
  VMdEditor.use(createCopyCodePlugin());
  VMdEditor.use(createLineNumbertPlugin());
  VMdEditor.use(createHighlightLinesPlugin());
  VMdEditor.use(createTodoListPlugin());
  VMdEditor.use(createAlignPlugin());

  // 处理图片上传，base64
  const handleUploadImage = (event: any, insertImage: any, files: any): void => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = function () {
      insertImage({
        url: this.result,
        desc: files[0].name,
        width: 'auto',
        height: 'auto',
      });
    };
  };

  interface Props {
    value: string;
    height?: string;
    leftToolBar?: string;
    includeLevel?: number[];
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    height: '500px',
    leftToolBar:
      'undo redo clear | h bold italic strikethrough quote tip todo-list | ul ol table hr | link image code',
    includeLevel: () => [1, 2, 3, 4],
  });

  let text = ref<string>(props.value);
  const emit = defineEmits<{
    (e: 'update:value', value: string): void;
  }>();
  watch(text, (value: string): void => {
    emit('update:value', value);
  });
</script>

<template>
  <v-md-editor
    v-model="text"
    :height="props.height"
    :left-toolbar="props.leftToolBar"
    :disabled-menus="[]"
    :include-level="props.includeLevel"
    @upload-image="handleUploadImage"
  />
</template>
