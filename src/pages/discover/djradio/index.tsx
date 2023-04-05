import type { jdCatType } from "@/service/api/djradio";
import React, { memo, useEffect, useState } from "react";
import { getDjBanner, getDjRecommend, getDjCat } from "@/service/api/djradio";
import styles from "./style.less";

import DjSwiper from "./dj-swiper";

const Djradio = memo(() => {
  const [jdCatList, setDjCatList] = useState<jdCatType["categories"]>([]);
  useEffect(() => {
    getDjCat().then((res) => {
      setDjCatList(res.categories);
    });
  }, []);

  return (
    <div className={styles.djradio}>
      <div className="wrap-v2 djradio-content">
        <DjSwiper data={jdCatList} />
      </div>
    </div>
  );
});

export default Djradio;
