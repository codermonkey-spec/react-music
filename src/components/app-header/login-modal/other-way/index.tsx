import React, { memo, useState } from "react";
import {
  WechatOutlined,
  QqOutlined,
  WeiboCircleOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import styles from "./style.less";

type otherWayType = {
  setIsOtherWay: React.Dispatch<boolean>;
};
const qrCodeImg =
  "https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png";

const loginWays = [
  {
    label: "微信登录",
    icon: <WechatOutlined style={{ color: "#1AAD19" }} />,
  },
  {
    label: "QQ登录",
    icon: <QqOutlined style={{ color: "#3f5dbf" }} />,
  },
  {
    label: "微博登录",
    icon: <WeiboCircleOutlined style={{ color: "#ff5b36" }} />,
  },
  {
    label: "网易邮箱账号登录",
    icon: <WeiboOutlined style={{ color: "#EA6A5A" }} />,
  },
];
const OtherWay: React.FC<otherWayType> = memo(({ setIsOtherWay }) => {
  const [isAgree, setIsAgree] = useState(false);

  const handleQrCodeClick = () => {
    if (!isAgree) {
      return;
    }
    setIsOtherWay(false);
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
              <div className="right-item" key={item.label}>
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
