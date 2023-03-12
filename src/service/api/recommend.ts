import { request } from "..";
import { requestApi } from "@/types";

export type bannerItem = {
  /** 封面图 */
  imageUrl: string;
  [key: string]: any;
};

export type bannerListType = {
  banners: bannerItem[];
  code: number;
};

export const getBanners: requestApi<bannerListType> = () => {
  return request("/banner", { method: "get" });
};
