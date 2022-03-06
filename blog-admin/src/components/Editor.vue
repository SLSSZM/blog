<script setup lang="ts">
  import { onMounted, ref, reactive, watch } from 'vue';

  //引入tinymce编辑器
  import Editor from '@tinymce/tinymce-vue';

  //引入方式引入node_modules里的tinymce相关文件文件
  import tinymce from 'tinymce/tinymce'; //tinymce默认hidden，不引入则不显示编辑器
  import 'tinymce/themes/silver'; //编辑器主题，不引入则报错
  import 'tinymce/icons/default'; //引入编辑器图标icon，不引入则不显示对应图标

  // 引入编辑器插件
  import 'tinymce/plugins/advlist'; //高级列表
  import 'tinymce/plugins/anchor'; //锚点
  import 'tinymce/plugins/autolink'; //自动链接
  import 'tinymce/plugins/autoresize'; //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
  import 'tinymce/plugins/autosave'; //自动存稿
  import 'tinymce/plugins/charmap'; //特殊字符
  import 'tinymce/plugins/code'; //编辑源码
  import 'tinymce/plugins/codesample'; //代码示例
  import 'tinymce/plugins/directionality'; //文字方向
  import 'tinymce/plugins/emoticons'; //表情
  import 'tinymce/plugins/fullpage'; //文档属性
  import 'tinymce/plugins/fullscreen'; //全屏
  import 'tinymce/plugins/help'; //帮助
  import 'tinymce/plugins/hr'; //水平分割线
  import 'tinymce/plugins/image'; //插入编辑图片
  import 'tinymce/plugins/importcss'; //引入css
  import 'tinymce/plugins/insertdatetime'; //插入日期时间
  import 'tinymce/plugins/link'; //超链接
  import 'tinymce/plugins/lists'; //列表插件
  import 'tinymce/plugins/media'; //插入编辑媒体
  import 'tinymce/plugins/nonbreaking'; //插入不间断空格
  import 'tinymce/plugins/pagebreak'; //插入分页符
  import 'tinymce/plugins/paste'; //粘贴插件
  import 'tinymce/plugins/preview'; //预览
  import 'tinymce/plugins/print'; //打印
  import 'tinymce/plugins/quickbars'; //快速工具栏
  import 'tinymce/plugins/save'; //保存
  import 'tinymce/plugins/searchreplace'; //查找替换
  // import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
  import 'tinymce/plugins/tabfocus'; //切入切出，按tab键切出编辑器，切入页面其他输入框中
  import 'tinymce/plugins/table'; //表格
  import 'tinymce/plugins/template'; //内容模板
  import 'tinymce/plugins/textcolor'; //文字颜色
  import 'tinymce/plugins/textpattern'; //快速排版
  import 'tinymce/plugins/toc'; //目录生成器
  import 'tinymce/plugins/visualblocks'; //显示元素范围
  import 'tinymce/plugins/visualchars'; //显示不可见字符
  import 'tinymce/plugins/wordcount'; //字数统计
  import { useThemeStore } from '@/store/theme';

  const store = useThemeStore();

  interface Props {
    value?: string;
    disabled?: boolean;
    height?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    disabled: false,
    height: 400,
  });

  let contentValue = ref<string>('');
  let init = reactive<any>({
    selector: '#tinymce',
    language_url: 'tinymce/skins/zh_CN.js', //引入语言包文件
    language: 'zh_CN', //语言类型
    skin: store.theme === 'dark' ? 'oxide-dark' : 'oxide',
    skin_url: store.theme === 'dark' ? 'tinymce/skins/ui/oxide-dark' : 'tinymce/skins/ui/oxide',
    plugins: [
      'advlist anchor autolink autosave code codesample  directionality  fullscreen hr insertdatetime link lists media nonbreaking pagebreak paste preview print save searchreplace tabfocus template textpattern visualblocks visualchars wordcount',
    ],
    toolbar: [
      'fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
      'hr bullist numlist link  preview anchor pagebreak insertdatetime media  forecolor backcolor fullscreen',
    ],
    menubar: 'file edit insert view format table',
    height: 400,
    placeholder: '在这里输入文字',
    branding: false,
    resize: true,
    elementpath: false,
    content_style: 'img {max-width:100%;}',
    content_css:
      store.theme === 'dark'
        ? 'tinymce/skins/content/dark/content.min.css'
        : 'tinymce/skins/content/default/content.min.css',
  });

  onMounted((): void => {
    tinymce.init({});
  });

  const emits = defineEmits<{
    (e: 'data', value: string): void;
  }>();

  watch(
    () => props.value,
    (value: string) => {
      contentValue.value = value;
    },
    { immediate: true }
  );
  watch(
    contentValue,
    (value: string) => {
      emits('data', value);
    },
    { immediate: true }
  );
</script>

<template>
  <div class="tinymce-box">
    <Editor v-model="contentValue" :init="init" :disabled="disabled" id="tinymce" />
  </div>
</template>

<style scoped lang="scss">
  .tinymce-box {
    width: 100%;
  }
</style>
