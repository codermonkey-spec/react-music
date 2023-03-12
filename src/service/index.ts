import type { AxiosError } from "axios";

import axios from "axios";
import { message } from "antd";
import { BASE_URL, TIME_OUT } from "./config";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    message.error(`请求发送失败${err}`);
  }
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err: AxiosError) => {
    switch (err.code) {
      case "500":
        message.error(`响应失败:${err.message}`);
        break;
    }
  }
);

export { request };
