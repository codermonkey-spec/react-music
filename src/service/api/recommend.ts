import { request } from "..";
import { requestApi, DeepPartial } from "@/types";

export type bannerItem = {
  /** 封面图 */
  imageUrl: string;
  [key: string]: any;
};

export type bannerListType = {
  banners: bannerItem[];
  code: number;
};

/** 轮播图 */
export const getBanners: requestApi<bannerListType> = () => {
  return request("/banner", { method: "get" });
};

export type hotRecommendItem = {
  id: number;
  /** 歌单名称 */
  name: string;
  /** 封面图 */
  picUrl: string;
  /** 播放数量 */
  playCount: number;
  [key: string]: any;
};

export type hotRecommendType = {
  result: Partial<hotRecommendItem>[];
};

/** 热门推荐 */
export const getHotRecommend: requestApi<hotRecommendType> = () => {
  return request("/personalized", { method: "get" });
};

/** 榜单id */
export enum ranking_id {
  TOP = 19723756,
  NEW = 3779629,
  ORIGIN = 2884035,
}

export type rankingItemType = {
  /** 歌曲名称 */
  name: string;
  [key: string]: any;
};

export type rankingSongsType = {
  playlist: {
    name: string;
    coverImgUrl: string;
    tracks: rankingItemType[];
    [key: string]: any;
  };
  [key: string]: any;
};

export type rankingInfoType = DeepPartial<rankingSongsType>;

/** 获取榜单对应的歌曲 */
export const getRankingSongs: requestApi<rankingSongsType> = (
  id: number = ranking_id.TOP
) => {
  return request("/playlist/detail", {
    method: "get",
    params: {
      id,
    },
  });
};
