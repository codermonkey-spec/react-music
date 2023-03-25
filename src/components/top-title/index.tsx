import React, { memo } from "react";

import styles from "./style.less";

type topTitleType = React.PropsWithChildren & {
  title?: string | React.ReactNode;
  icon?: boolean;
  renderTab?: () => React.ReactNode | React.ReactElement;
  renderMore?: React.ReactNode | (() => React.ReactNode);
};

const TopTitle: React.FC<topTitleType> = memo(
  ({ title, icon = true, renderMore, renderTab }) => {
    return (
      <div className={styles["top-title"]}>
        <div className="top-title-left">
          {icon && <div className="sprite_02 dot"></div>}
          {title && <div className="title">{title}</div>}
          {renderTab && <div className="tab-wrap">{renderTab()}</div>}
        </div>
        {renderMore && (
          <div className="top-title-right">
            {typeof renderMore === "function" ? renderMore() : renderMore}
          </div>
        )}
      </div>
    );
  }
);

export default TopTitle;
