import type { CarouselRef } from "antd/lib/carousel";
import type { bannerItem } from "@/service/api/recommend";

import React, { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Carousel } from "antd";

import styles from "./style.less";

type swiperPropsType = {
  data: bannerItem[];
};

type bannerDirectionType = "prev" | "next";

const defaultStyle = {
  backgroundPosition: "center center",
  backgroundSize: 6000,
};

const Swiper: React.FC<swiperPropsType> = ({ data }) => {
  const [currIndex, setCurIndex] = useState(0);
  const bannerRef = useRef<CarouselRef | null>(null);
  const springs = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
    config: { duration: 1000 },
    reset: true,
  });

  const handleChange = (from: number, to: number) => {
    setCurIndex(to);
  };

  const handleBannerChange = (direction: bannerDirectionType) => {
    if (bannerRef.current) {
      bannerRef.current[direction]();
    }
  };

  return (
    <animated.div
      className={styles.swiper}
      style={{
        ...defaultStyle,
        backgroundImage: `url(${data[currIndex]?.imageUrl}?imageView&blur=40x20)`,
        ...springs,
      }}
    >
      <div className="wrap-v2 swiper-wrap">
        <Carousel
          beforeChange={handleChange}
          ref={bannerRef}
          dots={{ className: "dots" }}
          effect="fade"
          autoplay
        >
          {data.map((item) => {
            return (
              <div className="swiper-item" key={item.imageUrl}>
                <img src={item.imageUrl} alt="" />
              </div>
            );
          })}
        </Carousel>
        <div
          className="btn prev"
          onClick={() => handleBannerChange("prev")}
        ></div>
        <div
          className="btn next"
          onClick={() => handleBannerChange("next")}
        ></div>
        <div className="sprite_download download"></div>
      </div>
    </animated.div>
  );
};

export default Swiper;
