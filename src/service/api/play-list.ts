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
  };
};

/** 获取歌单分类 */
export const getCatList: requestApi<catInfoType> = () => {
  return request("/playlist/catlist");
};

/** 歌单 */
export const getPlayList = (limit: number = 10, order: string = "new") => {
  return request("/top/playlist", {
    method: "get",
    params: {
      limit,
      order,
    },
  });
};
