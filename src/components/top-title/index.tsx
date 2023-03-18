import React, { memo } from "react";

import styles from "./style.less";
type topTitleType = React.PropsWithChildren & {
  title?: string;
  tab?: string[];
};

const TopTitle: React.FC<topTitleType> = memo(({ title, tab }) => {
  return (
    <div className={styles["top-title"]}>
      <div className="top-title-left">
        <div className="sprite_02 dot"></div>
        {title && <div className="title">{title}</div>}
        {tab && tab?.length > 0 && (
          <div className="tab-wrap">
            {tab?.map((item, index) => {
              return (
                <div key={item} className="tab-item">
                  <span> {item}</span>
                  {index !== tab.length - 1 && <span className="line">|</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="top-title-right">
        <div className="more">
          <div className="more-text">更多</div>
          <div className="sprite_02 more-icon"></div>
        </div>
      </div>
    </div>
  );
});

export default TopTitle;
