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
    plugins?: string | string[];
    toolbar?: string | string[];
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    disabled: false,
    plugins:
      'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave ',
    toolbar:
      'fullscreen undo redo restoredraft | fontsizeselect lineheight axupimgs cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect preview',
  });

  let contentValue = ref<string>('');
  let init = reactive<any>({
    selector: '#tinymce',
    language_url: 'tinymce/skins/zh_CN.js', //引入语言包文件
    //  language_url: import.meta.glob("./langs/zh_CN.js"), //引入语言包文件
    language: 'zh_CN', //语言类型

    skin: store.theme === 'dark' ? 'oxide-dark' : 'oxide',
    skin_url: store.theme === 'dark' ? 'tinymce/skins/ui/oxide-dark' : 'tinymce/skins/ui/oxide',

    plugins: props.plugins, //插件配置
    toolbar: props.toolbar, //工具栏配置，设为false则隐藏
    menubar: false, //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

    fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

    height: 400, //注：引入autoresize插件时，此属性失效
    placeholder: '在这里输入文字',
    branding: false, //tiny技术支持信息是否显示
    resize: true, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
    elementpath: false, //元素路径是否显示

    content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式
    content_css:
      store.theme === 'dark'
        ? 'tinymce/skins/content/dark/content.min.css'
        : 'tinymce/skins/content/default/content.min.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

    // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
    // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
    // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
      // const img = 'data:image/jpeg;base64,' + blobInfo.base64();
      // success(img);
    },
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
