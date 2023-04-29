import React, { memo, useEffect, useState } from "react";
import { getQrKey, getCreateQrImg } from "@/service/api/login";

import { LOGINWAY } from "../constants";
import styles from "./style.less";

import WyyModal from "@/components/wyy-modal";
import NormalWay from "./normal-way";
import OtherWay from "./other-way";
import EmailWay from "./email-way";

const loginComs = {
  0: NormalWay,
  1: OtherWay,
  2: EmailWay,
};
type LoginModalType = {
  visible: boolean;
  setVisible: React.Dispatch<boolean> &
    React.Dispatch<(prevState: boolean) => boolean>;
};

const LoginModal: React.FC<LoginModalType> = memo(({ visible, setVisible }) => {
  const [qrurl, setQrurl] = useState(" ");
  const [loginway, setLoginway] = useState(LOGINWAY.default);

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
      setLoginway(LOGINWAY.default);
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
        {Object.entries(loginComs).map((item, index) => {
          const Coms = item[1];
          return (
            index === loginway && (
              <Coms qrurl={qrurl} setLoginway={setLoginway} />
            )
          );
        })}
      </div>
    </WyyModal>
  );
});

export default LoginModal;
