import type {
  jdCatType,
  programRecommendType,
  programTopListType,
  djRecommendTypes,
} from "@/service/api/djradio";
import { memo, useEffect, useState } from "react";
import {
  getDjCat,
  getProgramRecommend,
  getProgramTopList,
  getDjRecommendType,
} from "@/service/api/djradio";
import styles from "./style.less";

import DjSwiper from "./dj-swiper";
import DjRank from "./dj-rank";
import DjTypes from "./dj-types";

const Djradio = memo(() => {
  const [jdCatList, setDjCatList] = useState<jdCatType["categories"]>([]);
  const [programRecommend, setProgramRecommend] = useState<
    programRecommendType["programs"]
  >([]);
  const [programTopList, setProgramTopList] = useState<
    programTopListType["toplist"] | []
  >([]);

  const [djTypes, setDjTypes] = useState<djRecommendTypes[]>([]);

  useEffect(() => {
    getDjCat().then((res) => {
      setDjCatList(res.categories);
    });

    getProgramRecommend().then((res) => {
      setProgramRecommend(res.programs);
    });

    getProgramTopList().then((res) => {
      setProgramTopList(res.toplist);
    });
  }, []);

  useEffect(() => {
    const promiseArr = [2, 6, 3, 2001, 11].map((item) =>
      getDjRecommendType(item)
    );

    Promise.all(promiseArr).then((res) => {
      setDjTypes(res);
    });
  }, []);

  return (
    <div className={styles.djradio}>
      <div className="wrap-v2 djradio-content">
        <DjSwiper data={jdCatList} />
        <DjRank
          programRecommend={programRecommend}
          programTopList={programTopList}
        />

        <DjTypes data={djTypes} />
      </div>
    </div>
  );
});

export default Djradio;
