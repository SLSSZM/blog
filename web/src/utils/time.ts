import dayjs from 'dayjs';

const transfromChinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export function transformChineseTime(time: string): string {
  const date = dayjs(new Date(time));
  const year = date.year();

  if (typeof date.month() !== 'number') return '时间格式错误';
  const monthNumber = date.month() + 1;
  let month = '';
  if (monthNumber > 10) {
    const two = transfromChinese[Math.floor(monthNumber % 10)];
    month = transfromChinese[10] + two;
  } else {
    month = transfromChinese[monthNumber];
  }

  let day = '';
  const dayNumber = date.date();
  if (dayNumber <= 10) {
    day = transfromChinese[dayNumber] + '号';
  } else if (dayNumber < 20) {
    const one = transfromChinese[Math.floor(dayNumber % 10)];
    day = transfromChinese[10] + one;
  } else {
    const one = transfromChinese[Math.floor(dayNumber / 10)];
    const two = transfromChinese[Math.floor(dayNumber % 10)];
    day = one + transfromChinese[10] + (two === transfromChinese[0] ? '' : two);
  }

  return year + ' ' + month + '月' + ' ' + day;
}
