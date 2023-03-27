export function getPlayerUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

function padLeft(time: number) {
  const timeStr = time + "";
  return ("00" + timeStr).slice(timeStr.length);
}

export function formatTime(time: number) {
  // 0.将毫秒转成秒
  time = time / 1000;

  // 1.获取时间
  const minute = Math.floor(time / 60);
  const second = Math.floor(time) % 60;

  // 2.拼接字符串
  return padLeft(minute) + ":" + padLeft(second);
}
