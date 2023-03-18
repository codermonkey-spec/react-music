import type { CarouselRef } from "antd/lib/carousel";
import type { newAlbumItemType } from "@/service/api/recommend";

import React, { memo, useRef } from "react";
import { Carousel } from "antd";

import styles from "./style.less";

import TopTitle from "@/components/top-title";
import AlbumItem from "@/components/album-item";

type bannerDirectionType = "prev" | "next";

type newAlbumProps = {
  data: newAlbumItemType[];
};

const NewAlbum: React.FC<newAlbumProps> = memo(({ data }) => {
  const ref = useRef<CarouselRef | null>(null);
  const handleBannerChange = (direction: bannerDirectionType) => {
    if (ref.current) {
      ref.current[direction]();
    }
  };
  return (
    <div className={styles["new-album"]}>
      <TopTitle title="新碟上架" />
      <div className="album-content">
        <Carousel ref={ref}>
          {[0, 1].map((item) => {
            return (
              <div className="group">
                {data.slice(item * 5, item * 5 + 5).map((child) => {
                  return <AlbumItem {...child} key={child.name} />;
                })}
              </div>
            );
          })}
        </Carousel>
        <div
          className="btn prev sprite_02"
          onClick={() => handleBannerChange("prev")}
        ></div>
        <div
          className="btn next sprite_02"
          onClick={() => handleBannerChange("next")}
        ></div>
      </div>
    </div>
  );
});

export default NewAlbum;
