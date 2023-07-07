import React, { Suspense, useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTransition, animated, useSpringRef } from "@react-spring/web";
import { discoverMenu } from "@/assets/data/local-data";
import styles from "./style.less";

export default function Discover() {
  const { pathname } = useLocation();
  const [currIndex, setCurrIndex] = useState(
    discoverMenu.findIndex((item) => item.link === pathname)
  )
  const springRef = useSpringRef();

  const transitions = useTransition(currIndex, {
    ref: springRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  });

  useEffect(() => {
    springRef.start();
  }, [currIndex]);

  return (
    <div className={styles.discover}>
      <div className="nav2">
        <div className="wrap-v1">
          <div className="nav2-wrap">
            {discoverMenu.map((item, index) => {
              return (
                <div
                  key={item.link}
                  className="nav-item"
                  onClick={() => setCurrIndex(index)}
                >
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Suspense fallback="loading...">
        {transitions((style) => (
          <animated.div style={style}>
            <Outlet />
          </animated.div>
        ))}
      </Suspense>

    </div>
  );
}
