import React, { memo, useState } from "react";

import styles from "./style.less";

import TopTitle from "@/components/top-title";
import CatBtn from "./cat-btn";

const PlayList = memo(() => {
  const [cat, setCat] = useState("全部");

  return (
    <div className={styles["play-list"]}>
      <div className="wrap-v2 play-list-content">
        <TopTitle
          title={cat}
          icon={false}
          renderTab={() => <CatBtn />}
          renderMore={<div>热门</div>}
        />
      </div>
    </div>
  );
});

export default PlayList;
