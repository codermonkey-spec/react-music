import { request } from "..";
import { requestApi } from "@/types";

export type topListItem = {
  coverImgUrl: string;
  name: string;
  updateFrequency: string;
  /**榜单id */
  id: number;
  /** 最近更新时间 */
  updateTime: number;

  subscribedCount: number;
  playCount: number;
  [key: string]: any;
};

export type topListType = {
  artistToplist: {
    coverUrl: string;
    name: string;
    [key: string]: any;
  };
  code: number;
  list: topListItem[];
};

/**获取所有榜单信息 */
export const getTopList: requestApi<topListType> = () => {
  return request("/toplist", {
    method: "get",
  });
};

export type trackAllType = {
  songs: {
    name: string;
    id: number;
    al: {
      id: number;
      picUrl: string;
    };
    ar: {
      id: number;
      name: string;
    }[];
    /** 歌曲总时间 */
    dt: number;
    /** 对应歌曲的下标 */
    index?: number;
  }[];
};

/** 获取榜单对应的所有歌曲信息 */
export const getTrackAll: requestApi<trackAllType> = (
  id: number,
  limit: number = 100,
  offset: number = 1
) => {
  return request("/playlist/track/all", {
    method: "get",
    params: {
      id,
      limit,
      offset,
    },
  });
};
