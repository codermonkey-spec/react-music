import { request } from "..";
import { requestApi } from "@/types";

type qrKeyType = {
  data: {
    unikey: string;
  };
};

export const getQrKey: requestApi<qrKeyType> = () => {
  return request("/login/qr/key", {
    method: "get",
    params: {
      time: new Date(),
    },
  });
};

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
