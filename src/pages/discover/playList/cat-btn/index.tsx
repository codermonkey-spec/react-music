import type { catInfoType } from "@/service/api/play-list";
import React, { memo, useEffect, useState } from "react";
import classNames from "classnames";
import { Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCatList } from "@/service/api/play-list";
import styles from "./style.less";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const CatBtn = memo(() => {
  const [catInfo, setCatInfo] = useState<catInfoType | null>(null);
  useEffect(() => {
    getCatList().then((res) => {
      setCatInfo(res);
    });
  }, []);

  return (
    <Popover
      placement="bottom"
      content={content}
      title={<div>全部风格</div>}
      trigger="click"
    >
      <div className={classNames(styles["cat-btn"])}>
        <span className="text">选择分类</span>
        <DownOutlined />
      </div>
    </Popover>
  );
});

export default CatBtn;
