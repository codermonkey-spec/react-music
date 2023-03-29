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

/** 歌词解析 */
export type lyricType = {
  time: number;
  text: string;
};
export const parseLyrics = (lyrics: string) => {
  const results: lyricType[] = [];
  const lines = lyrics.split("\n");
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  for (let line of lines) {
    const times = timeReg.exec(line);
    if (!times) continue;
    const [all, minute, second, millisecond] = times;

    const time =
      Number(minute) * 60 * 1000 +
      Number(second) * 1000 +
      (millisecond.length === 3
        ? Number(millisecond)
        : Number(millisecond) * 10);

    const text = line.replace(timeReg, "");
    results.push({ time, text });
  }

  return results;
};
