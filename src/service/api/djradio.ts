import { request } from "..";
import { requestApi } from "@/types";

export const getDjRecommend = (limit: number = 5) => {
  return request("/dj/personalize/recommend", {
    method: "get",
    params: {
      limit,
    },
  });
};

export type jdCatType = {
  categories: {
    /** 默认封面图 */
    pic96x96Url: string;
    /** 选中的封面图 */
    pic84x84IdUrl: string;
    /** 全部的封面图 */
    picWebUrl: string;
    name: string;
    id: number;
  }[];
};
/** 获取电台分类 */
export const getDjCat: requestApi<jdCatType> = () => {
  return request("/dj/catelist");
};

export type programRecommendType = {
  programs: {
    /** 封面图 */
    coverUrl: string;
    name: string;
    radio: {
      name: string;
    };
    id: number;
  }[];
  name: string;
  more: boolean;
  code: number;
};

/** 推荐节目 */
export const getProgramRecommend: requestApi<programRecommendType> = () => {
  return request("/program/recommend");
};

export type programTopListType = {
  toplist: {
    program: {
      id: number;
      coverUrl: string;
      name: string;
      radio: {
        name: string;
      };
    };
  }[];
};

/** 节目排行榜 */
export const getProgramTopList: requestApi<programTopListType> = (
  limit: number = 10
) => {
  return request("/dj/program/toplist", {
    method: "get",
    params: {
      limit,
    },
  });
};

export type djRecommendTypes = {
  djRadios: {
    name: string;
    id: number;
    picUrl: string;
    rcmdtext: string;
    category: string;
  }[];
};

/** 分类电台 */
export const getDjRecommendType: requestApi<djRecommendTypes> = (
  type: number = 2
) => {
  return request("/dj/recommend/type", {
    method: "get",
    params: {
      type,
    },
  });
};
