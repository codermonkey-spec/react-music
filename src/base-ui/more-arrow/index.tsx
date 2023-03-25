import React, { memo } from "react";
import classNames from "classnames";
import styles from "./style.less";

const MoreArrow = memo(() => {
  return <div className={classNames("sprite_02", styles["more-icon"])}></div>;
});

export default MoreArrow;
