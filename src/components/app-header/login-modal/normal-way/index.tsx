import React, { memo } from "react";

import { QRCode } from "antd";
type normalWayType = {
  qrurl: string;
  setIsOtherWay: React.Dispatch<boolean>;
};
const loginImg =
  "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png";

const NormalWay: React.FC<normalWayType> = memo(({ qrurl, setIsOtherWay }) => {
  return (
    <div>
      <div className="login-content">
        <div className="login-img">
          <img src={loginImg} alt="" />
        </div>
        <div className="qr-code">
          <div className="qr-title">扫码登录</div>
          <div className="qr-code-img">
            <QRCode value={qrurl} />
          </div>
          <div className="text">使用 网易云音乐APP 扫码登录</div>
        </div>
      </div>
      <div className="other" onClick={() => setIsOtherWay(true)}>
        选择其他登录方式
      </div>
    </div>
  );
});

export default NormalWay;
