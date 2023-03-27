import type { catInfoType } from "@/service/api/play-list";
import React, { memo, useEffect, useState } from "react";
import classNames from "classnames";
import { Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCatList } from "@/service/api/play-list";
import styles from "./style.less";

import CatContent from "./cat-content";

const CatBtn: React.FC<{
  cat: string;
  setCat: React.Dispatch<string>;
}> = memo(({ setCat, cat }) => {
  const [catInfo, setCatInfo] = useState<catInfoType | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getCatList().then((res) => {
      setCatInfo(res);
    });
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleOpenChange = () => {
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      placement="bottom"
      content={
        <CatContent
          catInfo={catInfo}
          setOpen={setOpen}
          setCat={setCat}
          cat={cat}
        />
      }
      title={<div className="all-cat">全部风格</div>}
      trigger="click"
      onOpenChange={handleOpenChange}
      overlayClassName={styles["cat-popver"]}
    >
      <div className={classNames(styles["cat-btn"])} onClick={handleClick}>
        <span className="text">选择分类</span>
        <DownOutlined />
      </div>
    </Popover>
  );
});

export default CatBtn;
