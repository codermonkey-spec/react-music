import { request } from "..";
import { requestApi } from "@/types";

export type hotSingersType = {
  more: boolean;
  artists: {
    name: string;
    picUrl: string;
    id: number;
  }[];
};

// 获取热门歌手列表
export const getHotSingers: requestApi<hotSingersType> = (
  limit: number = 10,
  offset: number = 0
) => {
  return request("/top/artists", {
    method: "get",
    params: {
      limit,
      offset,
    },
  });
};

export type singerRankType = {
  list: {
    artists: {
      name: string;
      id: number;
    }[];
  };
};

// 歌手榜
export const getSingerRank: requestApi<singerRankType> = () => {
  return request("/toplist/artist");
};
