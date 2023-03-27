import { request } from "..";
import { requestApi } from "@/types";

export type catInfoType = {
  all: {
    /** 头部分类名称 */
    name: string;
    [key: string]: any;
  };
  /** 歌单分类 */
  categories: {
    [key: number]: string;
  };
  sub: {
    activity: boolean;
    category: keyof catInfoType["categories"];
    hot: boolean;
    imgId: number;
    imgUrl: string | null;
    name: string;
    resourceCount: number;
    resourceType: number;
    type: number;
  }[];
};

/** 获取歌单分类 */
export const getCatList: requestApi<catInfoType> = () => {
  return request("/playlist/catlist");
};

export type playListType = {
  cat: string;
  playlists: {
    id: number;
    name: string;
    description: string;
    coverImgUrl: string;
  }[];
};

/** 歌单 */
export const getPlayList: requestApi<playListType> = (
  limit: number = 35,
  order: string = "hot",
  cat: string = "全部"
) => {
  return request("/top/playlist", {
    method: "get",
    params: {
      limit,
      order,
      cat,
    },
  });
};
