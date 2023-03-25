import type { topListItem } from "@/service/api/top-list";
import React, { memo } from "react";

import styles from "./style.less";
const RightInfo: React.FC<{
  data?: topListItem;
}> = memo(({ data }) => {
  return (
    <div className={styles["right-info"]}>
      <div className="info-img">
        <img src={data?.coverImgUrl} alt="" />
      </div>
      <div className="ranking-info">
        <div>{data?.name}</div>
        {/* <div>
          <span></span>
        </div> */}
      </div>
    </div>
  );
});

export default RightInfo;
