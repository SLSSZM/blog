import { defineStore } from 'pinia';

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
}

interface Theme {
  bg: string;
  bgc: string;
  bg_r: string;
  bgc_r: string;
  fc: string;
  fct: string;
  fc_r: string;
  fct_r: string;
  bc: string;
  hover: string;
  grey: string;
  grey_t: string;
  danger: string;
  danger_plain: string;
  primary: string;
  primary_plain: string;
  br: string;
}

interface ThemeState {
  light: Theme;
  dark: Theme;
  theme: ThemeType;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    light: {
      bg: 'rgba(247,247,247,1)',
      bgc: 'rgba(252,253,252,1)',
      bg_r: 'rgba(30,30,30,1)',
      bgc_r: 'rgba(38,38,39,1)',
      fc: 'rgba(0,0,0,0.85)',
      fct: 'rgba(0,0,0,0.45)',
      fc_r: 'rgba(139,148,158,1)',
      fct_r: 'rgba(155,160,165,1)',
      bc: 'rgba(238,238,238,1)',
      hover: 'rgba(64,69,71,0.04)',
      grey: 'rgba(64,69,71,0.2)',
      grey_t: 'rgba(109,112,112,0.08)',
      danger: 'rgba(225,111,103,1)',
      danger_plain: 'rgba(231,91,81,0.07)',
      primary: 'rgba(4,120,190,1)',
      primary_plain: 'rgba(98,163,224,0.07)',
      br: '10px',
    },
    dark: {
      bg: 'rgba(30,30,30,1)',
      bgc: 'rgba(38,38,39,1)',
      bg_r: 'rgba(247,247,247,1)',
      bgc_r: 'rgba(252,253,252,1)',
      fc: 'rgba(212,218,225,1)',
      fct: 'rgba(155,160,165,1)',
      fc_r: 'rgba(0,0,0,0.85)',
      fct_r: 'rgba(0,0,0,0.45)',
      bc: 'rgba(58,57,57,1)',
      hover: 'rgba(64,69,71,0.2)',
      grey: 'rgba(64,69,71,0.32)',
      grey_t: 'rgba(109,112,112,0.08)',
      danger: 'rgba(225,111,103,1)',
      danger_plain: 'rgba(177,115,111,0.34)',
      primary: 'rgba(4,120,190,1)',
      primary_plain: 'rgba(98,163,224,0.07)',
      br: '10px',
    },
    theme: ThemeType.Light,
  }),
  actions: {
    // 初始化主题
    init(themeType?: ThemeType): void {
      this.changeTheme(themeType || this.theme);
    },
    // 切换主题
    changeTheme(themeType: ThemeType): void {
      if (themeType === ThemeType.Dark) {
        this.setTheme(this.dark);
      } else if (themeType === ThemeType.Light) {
        this.setTheme(this.light);
      }
      this.theme = themeType;
    },
    // 设置主题
    setTheme(themeData: any): void {
      const names: string[] = Object.keys(themeData);
      for (const name of names) {
        const value: string = themeData[name];
        this.setCssProperty(name, value);
      }
    },
    // 设置主题颜色
    setCssProperty(name: string, value: string): void {
      document.documentElement.style.setProperty('--' + name, value);
    },
  },
});
