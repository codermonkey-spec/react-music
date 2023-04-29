import React, { memo, useState } from "react";
import {
  WechatOutlined,
  QqOutlined,
  WeiboCircleOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { qrCodeImg, loginWayUrl, LOGINWAY } from "../../constants";
import styles from "./style.less";

type otherWayType = {
  setLoginway: React.Dispatch<LOGINWAY>;
};

const loginWays = [
  {
    label: "微信登录",
    icon: <WechatOutlined style={{ color: "#1AAD19" }} />,
    onClick: () => window.open(loginWayUrl.WECHAT),
  },
  {
    label: "QQ登录",
    icon: <QqOutlined style={{ color: "#3f5dbf" }} />,
    onClick: () => window.open(loginWayUrl.QQ),
  },
  {
    label: "微博登录",
    icon: <WeiboCircleOutlined style={{ color: "#ff5b36" }} />,
    onClick: () => window.open(loginWayUrl.WEIBO),
  },
  {
    label: "网易邮箱账号登录",
    icon: <WeiboOutlined style={{ color: "#EA6A5A" }} />,
    onClick: () => console.log("网易云邮箱登录"),
  },
];
const OtherWay: React.FC<otherWayType> = memo(({ setLoginway }) => {
  const [isAgree, setIsAgree] = useState(false);

  const handleQrCodeClick = () => {
    if (!isAgree) {
      return;
    }
    setLoginway(LOGINWAY.default);
  };

  const handleIsAgreeChange = () => {
    setIsAgree(!isAgree);
  };

  return (
    <div className={styles["other-way"]}>
      <div className="other-way-wrap">
        <div className="left">
          <div className="loginImg">
            <img src={require("@/assets/img/login_img.png")} alt="" />
          </div>
          <div className="sprite_button phone-login">手机号登录</div>
          <div className="sprite_button register">注册</div>
        </div>
        <div className="right">
          {loginWays.map((item) => {
            return (
              <div
                className="right-item"
                key={item.label}
                onClick={item.onClick}
              >
                <div>{item.icon}</div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom">
        <input
          type="checkbox"
          id="agree"
          checked={isAgree}
          onChange={handleIsAgreeChange}
        />
        <label htmlFor="agree">
          <span className="agree">同意</span>
        </label>
        <span>《服务条款》</span>
        <span>《隐私政策》</span>
        <span>《儿童隐私政策》</span>
      </div>
      <div className="qrcode-img" onClick={handleQrCodeClick}>
        <img src={qrCodeImg} alt="" />
      </div>
    </div>
  );
});

export default OtherWay;
