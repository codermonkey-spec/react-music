import React, { memo } from "react";
import ReactDOM from "react-dom";
import { animated, useSpring, config } from "@react-spring/web";

type wyyToastTitle = {
  title: string;
};

const WyyToast: React.FC<wyyToastTitle> = memo(({ title }) => {
  const springs = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  });
  return <animated.div>WyyToast</animated.div>;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: wyyToastTitle) => {
  return ReactDOM.createPortal(<WyyToast {...props} />, document.body);
};
