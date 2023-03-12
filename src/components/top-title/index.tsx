import React, { memo } from "react";

import styles from "./style.less";
type topTitleType = React.PropsWithChildren & {
  title?: string;
};

const TopTitle: React.FC<topTitleType> = memo(({ title }) => {
  return (
    <div className={styles["top-title"]}>
      <div>
        <div className="dot"></div>
        {title && <div className="title">{title}</div>}
        <div className="tab"></div>
      </div>
      <div>
        <div className="more">
          <div className="more-text">更多</div>
          <div className="more-icon"></div>
        </div>
      </div>
    </div>
  );
});

export default TopTitle;
