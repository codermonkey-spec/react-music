import type { bannerListType } from "@/service/api/recommend";

import React, { memo, useEffect, useState } from "react";
import { getBanners } from "@/service/api/recommend";

import styles from "./style.less";
import TopSwiper from "./top-swiper";
import HotRecommend from "./hot-recommend";

const Recommend = memo(() => {
  const [banners, setBanners] = useState<bannerListType["banners"]>([]);
  useEffect(() => {
    getBanners().then((res) => {
      setBanners(res.banners);
    });
  }, []);
  return (
    <div className={styles.recommend}>
      <TopSwiper data={banners} />
      <div className="wrap-v2 content">
        <div className="left">
          <HotRecommend />
        </div>
        <div className="right">right</div>
      </div>
    </div>
  );
});

export default Recommend;
