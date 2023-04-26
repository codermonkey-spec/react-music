import React, { memo, useEffect, useState } from "react";
import { getQrKey, getCreateQrImg } from "@/service/api/login";

import styles from "./style.less";

import WyyModal from "@/components/wyy-modal";
import NormalWay from "./normal-way";
import OtherWay from "./other-way";

type LoginModalType = {
  visible: boolean;
  setVisible: React.Dispatch<boolean> &
    React.Dispatch<(prevState: boolean) => boolean>;
};

const LoginModal: React.FC<LoginModalType> = memo(({ visible, setVisible }) => {
  const [qrurl, setQrurl] = useState(" ");
  const [isOtherWay, setIsOtherWay] = useState(false);

  useEffect(() => {
    getQrUrl();
  }, []);

  const getQrUrl = async () => {
    const { data: { unikey } = { unikey: "" } } = await getQrKey();
    const { data: { qrurl } = { qrurl: "" } } = await getCreateQrImg(unikey);
    setQrurl(qrurl);
  };

  useEffect(() => {
    if (visible) {
      setIsOtherWay(false);
    }
  }, [visible]);

  const onCancel = () => {
    setVisible((last) => !last);
  };

  return (
    <WyyModal
      visible={visible}
      onMaskClick={onCancel}
      title="登录"
      classNames={styles["wrapper-modal"]}
    >
      <div className="login-wrap">
        {isOtherWay ? (
          <OtherWay setIsOtherWay={setIsOtherWay} />
        ) : (
          <NormalWay qrurl={qrurl} setIsOtherWay={setIsOtherWay} />
        )}
      </div>
    </WyyModal>
  );
});

export default LoginModal;
