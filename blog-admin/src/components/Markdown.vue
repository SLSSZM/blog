<script setup lang="ts">
  import { useThemeStore } from '@/store/theme';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { reactive, inject, Ref, ref, onMounted } from 'vue';

  let contentEditor = ref<Vditor | null>();
  const store = useThemeStore();
  let clientLevel = inject<Ref<number>>('clientLevel', ref<number>(1));
  const props = defineProps<{
    value: string;
  }>();
  const emits = defineEmits<{
    (e: 'data', data: string): void;
  }>();
  onMounted(() => {
    contentEditor.value = new Vditor('vditor', {
      height: 400,
      width: '100%',
      theme: store.theme === 'dark' ? 'dark' : 'classic',
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        contentEditor.value && contentEditor.value.setValue(props.value);
      },
      preview: {
        delay: 200,
        actions: [],
      },
      mode: clientLevel.value === 3 ? 'ir' : 'sv',
      fullscreen: {
        index: 520,
      },
      input(value: string) {
        emits('data', value);
      },
    });
  });
</script>

<template><div id="vditor" name="description"></div></template>
