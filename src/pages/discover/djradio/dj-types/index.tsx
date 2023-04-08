import type { djRecommendTypes } from "@/service/api/djradio";
import React, { memo } from "react";

import TopTitle from "@/components/top-title";
import styles from "./style.less";
const DjTypes: React.FC<{
  data: djRecommendTypes[];
}> = memo(({ data }) => {
  return (
    <div className={styles["dj-types"]}>
      {data.map((item, index) => {
        return (
          <div key={item.djRadios[index].id}>
            <TopTitle
              icon={false}
              title={`${item.djRadios[index].category} · 电台`}
              renderMore={<div>更多&gt;</div>}
            />
            <div className="type-content">
              {item.djRadios.slice(0, 4).map((child) => {
                return (
                  <div key={child.id} className="type-item">
                    <div className="left">
                      <img src={child.picUrl} alt="" />
                    </div>
                    <div className="right">
                      <div className="name">{child.name}</div>
                      <div className="rcmdtext">{child.rcmdtext}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default DjTypes;
