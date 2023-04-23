import React, { useEffect, useState } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { animated, useSpring, config } from "@react-spring/web";

import styles from "./style.less";

type wyyModalType = {
  visible: boolean;
  children?: React.ReactNode;
  onMaskClick?: () => void;
  classNames?: string;
  title?: string;
};

const WyyModal: React.FC<wyyModalType> = ({
  visible,
  children,
  onMaskClick,
  classNames,
  title,
}) => {
  const [maskVisible, setMaskVisible] = useState<boolean>(false);
  const contentStyle = useSpring({
    transform: visible ? "scale(1)" : "scale(0)",
    config: config.gentle,
  });

  useEffect(() => {
    if (visible) {
      document.body.setAttribute("style", "overflow:hidden");
    } else {
      document.body.removeAttribute("style");
    }
  }, [visible]);

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
    <div className={classnames(styles["wyy-modal"], classNames)}>
      <animated.div
        className="mask"
        style={{ ...maskStyle, display: maskVisible ? "block" : "none" }}
      ></animated.div>
      <animated.div
        className="wrap"
        style={{ ...contentStyle }}
        onClick={hClickMask}
      >
        <animated.div
          className="container"
          style={{ ...contentStyle }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header">
            <div className="title">{title}</div>
            <div className="closeIcon" onClick={hClickMask}>
              <span>x</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default function Modal(props: wyyModalType) {
  return ReactDOM.createPortal(<WyyModal {...props} />, document.body);
}
