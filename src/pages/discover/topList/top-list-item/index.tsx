import type { topListItem } from "@/service/api/top-list";

import React, { memo } from "react";
import classNames from "classnames";

import styles from "./style.less";

const TopListItem: React.FC<
  topListItem & { currId: number; handleClick: (id: number) => void }
> = memo(({ coverImgUrl, name, updateFrequency, id, currId, handleClick }) => {
  return (
    <div
      className={classNames(
        styles["top-list-item"],
        currId === id && styles.active
      )}
      onClick={() => handleClick(id)}
    >
      <div className="list-item-img">
        <img src={coverImgUrl} alt="" />
      </div>
      <div className="list-item-info">
        <div className="name">{name}</div>
        <div className="updateFrequency">{updateFrequency}</div>
      </div>
    </div>
  );
});

export default TopListItem;
