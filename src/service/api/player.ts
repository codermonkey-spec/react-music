import { request } from "..";
import { requestApi } from "@/types";

import type { playerType } from "@/store/module/player";

/** 获取歌曲信息 */
export const getCurrSongs: requestApi<{
  code: number;
  songs: playerType[];
}> = (ids: number) => {
  return request("/song/detail", {
    method: "get",
    params: {
      ids,
    },
  });
};

/** 获取歌词信息 */

export const getLyric: requestApi<{
  lrc: {
    lyric: string;
  };
}> = (id: number) => {
  return request("/lyric", {
    method: "get",
    params: {
      id,
    },
  });
};
