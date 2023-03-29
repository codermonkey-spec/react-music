import React, { memo } from "react";
import { artistCategories } from "@/assets/data/local-data";

import styles from "./style.less";

const Artist = memo(() => {
  return (
    <div className={styles.artist}>
      <div className="wrap-v2 artist-content">
        <div className="artist-left">
          <div className="wrap">
            {artistCategories.map((item) => {
              return (
                <div key={item.title} className="artist-item">
                  <div className="title">{item.title}</div>
                  {item.artists.map((child) => {
                    return (
                      <div key={child.name} className="artist-name">
                        <span className="dot"></span>
                        <span>{child.name}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="artist-right"></div>
      </div>
    </div>
  );
});

export default Artist;
