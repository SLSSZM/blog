import { defineStore } from 'pinia';
import { ConfigData } from '@/network/api';

interface ConfigState {
  configData: ConfigData;
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
  }),
  actions: {
    setConfigData(data: any): void {
      if (data && data.configs) {
        this.configData = data;
      }
    },
  },
});
