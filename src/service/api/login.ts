import { request } from "..";
import { requestApi } from "@/types";

/** 获取二维码key */
export const getQrKey: requestApi<{
  data: {
    unikey: string;
  };
}> = () => {
  return request("/login/qr/key", {
    method: "get",
    params: {
      time: new Date(),
    },
  });
};

/** 根据key获取二维码图片 */
export const getCreateQrImg: requestApi<{
  data: {
    qrurl: string;
  };
}> = (key: string) => {
  return request("/login/qr/create", {
    method: "get",
    params: {
      key,
      time: new Date(),
    },
  });
};
