import { defineStore } from 'pinia';

export enum eTheme {
  DARK = 'dark',
  LIGHT = 'light',
}
export interface Theme {
  // 页面
  background_color: string;
  // 页面内容
  background_color_content: string;
  // 字体颜色（反）
  color_reverse: string;
  // 字体颜色
  color: string;
  // 字体颜色（浅）
  color_tint: string;
  // 边框颜色
  border_color: string;
}
export interface ThemeState {
  light: Theme;
  dark: Theme;
  theme: eTheme;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    light: {
      background_color: '#F0F2F5',
      background_color_content: '#FFF',
      color_reverse: '#FFF',
      color: '#000000D9',
      color_tint: '#00000073',
      border_color: '#D0D0D0',
    },
    dark: {
      background_color: '#202225',
      background_color_content: '#252525',
      color_reverse: '#252525',
      color: '#C9D1D9',
      color_tint: '#8B949E',
      border_color: '#303030',
    },
    theme: eTheme.LIGHT,
  }),
  actions: {
    // 初始化主题
    init(): void {
      this.changeTheme(this.theme);
    },
    // 切换主题
    changeTheme(themeType: eTheme): void {
      if (themeType === eTheme.DARK) {
        const names: string[] = Object.keys(this.dark);
        for (const name of names) {
          const value: string = this.dark[name];
          this.setCssProperty(name, value);
        }
      } else if (themeType === eTheme.LIGHT) {
        const names: string[] = Object.keys(this.light);
        for (const name of names) {
          const value: string = this.light[name];
          this.setCssProperty(name, value);
        }
      }
      this.theme = themeType;
    },
    // 设置主题颜色
    setCssProperty(name: string, value: string): void {
      document.documentElement.style.setProperty('--' + name, value);
    },
  },
});
