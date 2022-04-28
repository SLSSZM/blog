import { defineStore } from 'pinia';
import { ConfigData } from '@/network/api';

interface ConfigState {
  configData: ConfigData;
  isScrollBottom: boolean;
  scrollTop: number;
  isSetScroll: boolean;
}
export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    configData: {
      configs: {
        myAvatar: '',
        githubPath: '',
        description: '',
        image: '',
        userAvatar: [],
      },
      tags: [],
    },
    isSetScroll: true,
    isScrollBottom: false,
    scrollTop: 0,
  }),
  actions: {
    setConfigData(data: any): void {
      if (data && data.configs) {
        this.configData = data;
      }
    },
    setScroll(): void {
      if (!this.isSetScroll) return;
      const htmlDom = document.documentElement;
      const scrollTop = htmlDom.scrollTop;
      const clientHeight = htmlDom.clientHeight;
      const scrollHeight = htmlDom.scrollHeight;
      this.scrollTop = scrollTop;
      if (scrollTop + clientHeight + 200 - scrollHeight >= 0) {
        this.isScrollBottom = true;
      } else {
        this.isScrollBottom = false;
      }
    },
    initScroll(): void {
      this.scrollTop = 0;
      this.isScrollBottom = false;
      this.isSetScroll = false;
      setTimeout(() => {
        this.isSetScroll = true;
      }, 80);
    },
  },
});
