import React, { memo } from "react";

import styles from "./style.less";

type tabProps = {
  tab?: string[];
};
type topTitleType = React.PropsWithChildren &
  tabProps & {
    title?: string | React.ReactNode;
    onTabItemClick?: (item: any) => void;
    isMore?: boolean;
    icon?: boolean;
  };

const TopTitle: React.FC<topTitleType> = memo(
  ({ title, tab, isMore = true, icon = true, onTabItemClick }) => {
    return (
      <div className={styles["top-title"]}>
        <div className="top-title-left">
          {icon && <div className="sprite_02 dot"></div>}
          {title && <div className="title">{title}</div>}
          {tab && tab?.length > 0 && (
            <div className="tab-wrap">
              {tab?.map((item, index) => {
                return (
                  <div
                    key={item}
                    className="tab-item"
                    onClick={() => onTabItemClick!(item)}
                  >
                    <span> {item}</span>
                    {index !== tab.length - 1 && (
                      <span className="line">|</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {isMore && (
          <div className="top-title-right">
            <div className="more">
              <div className="more-text">更多</div>
              <div className="sprite_02 more-icon"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default TopTitle;
