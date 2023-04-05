import { request } from "..";
import { requestApi } from "@/types";

export const getDjBanner = () => {
  return request("/dj/banner");
};

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
