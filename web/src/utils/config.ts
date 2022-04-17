// 随机获取用户头像
export function randomAvatar() {
  const list = JSON.parse(localStorage.getItem('CONFIG') || '{}').configs.userAvatar;
  const number = Math.floor(Math.random() * list.length);
  return list[number];
}
