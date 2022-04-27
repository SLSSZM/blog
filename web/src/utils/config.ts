import { useConfigStore } from '@/store/config';

// 随机获取用户头像
export function randomAvatar() {
  const ConfigState = useConfigStore();
  const list = ConfigState.configData?.configs?.userAvatar || [];
  const number = Math.floor(Math.random() * list.length);
  return list[number];
}
