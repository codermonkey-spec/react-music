import React, { useState } from "react";
import ReactDOM from "react-dom";
import { animated, useSpring } from "@react-spring/web";

import styles from "./style.less";

type wyyModalType = {
  visible: boolean;
  children?: React.ReactNode;
  onMaskClick?: () => void;
};

const WyyModal: React.FC<wyyModalType> = ({
  visible,
  children,
  onMaskClick,
}) => {
  const [maskVisible, setMaskVisible] = useState<boolean>(false);
  const contentStyle = useSpring({
    transform: visible ? "scale(1)" : "scale(0)",
  });

  const maskStyle = useSpring({
    opacity: visible ? 1 : 0,
    onStart({ value }) {
      if (value.opacity < 0.1) {
        setMaskVisible(true);
      }
    },
    onRest({ value }) {
      if (value.opacity < 0.1) {
        setMaskVisible(false);
      }
    },
  });
  const hClickMask = () => {
    onMaskClick?.();
  };

  return (
    <div className={styles["wyy-modal"]}>
      <animated.div
        className="mask"
        style={{ ...maskStyle, display: maskVisible ? "block" : "none" }}
      ></animated.div>
      <animated.div
        className="wrap"
        style={{ ...contentStyle }}
        onClick={hClickMask}
      >
        <animated.div className="container" style={{ ...contentStyle }}>
          <div className="header"></div>
          <div className="content">{children}</div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default function Modal(props: wyyModalType) {
  return ReactDOM.createPortal(<WyyModal {...props} />, document.body);
}
