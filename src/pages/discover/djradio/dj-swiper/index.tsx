import type { CarouselRef } from "antd/lib/carousel";
import type { jdCatType } from "@/service/api/djradio";
import React, { memo, useRef } from "react";
import { Carousel } from "antd";
import styles from "./style.less";

type bannerDirectionType = "prev" | "next";

const DjSwiper: React.FC<{
  data: jdCatType["categories"];
}> = memo(({ data = [] }) => {
  const swiperRef = useRef<CarouselRef | null>(null);

  const handleBannerChange = (direction: bannerDirectionType) => {
    if (swiperRef.current) {
      swiperRef.current[direction]();
    }
  };

  return (
    <div className={styles["dj-swiper"]}>
      {data.length > 0 && (
        <Carousel className="swiper" ref={swiperRef}>
          {[0, 1].map((item) => {
            return (
              <div className="group" key={item}>
                {data.slice(item * 18, item * 18 + 18).map((child) => {
                  return (
                    <div key={child.id} className="cat-item">
                      <div
                        style={{ backgroundImage: `url(${child.picWebUrl})` }}
                        className="img"
                      ></div>
                      <div className="text">{child.name}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
      )}
      {data.length > 0 && (
        <div className="opt">
          <span
            className="radio_slide btn prev"
            onClick={() => handleBannerChange("prev")}
          ></span>
          <span
            className="radio_slide btn next"
            onClick={() => handleBannerChange("next")}
          ></span>
        </div>
      )}
    </div>
  );
});

export default DjSwiper;
