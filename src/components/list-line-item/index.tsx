import React, { memo } from "react";

import styles from "./style.less";

type ListLineItemProps = {
  data?: any[];
  onItemClick?: (item: any) => void;
};

const ListLineItem: React.FC<ListLineItemProps> = memo(
  ({ data = [], onItemClick }) => {
    return (
      <>
        {data.map((item, index) => {
          return (
            <div
              className={styles["tab-item"]}
              onClick={() => (onItemClick ? onItemClick(item) : null)}
              key={index}
            >
              <span> {item}</span>
              {index !== data.length - 1 && <span className="line">|</span>}
            </div>
          );
        })}
      </>
    );
  }
);

export default ListLineItem;
