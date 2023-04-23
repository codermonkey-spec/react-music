import React, { memo, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { headerLinks } from "@/assets/data/local-data";
import { getSearchSuggest } from "@/service/api/recommend";

import styles from "./style.less";

import LoginModal from "./login-modal";
const AppHeader = memo(() => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSuggest = useCallback(
    debounce((value: string) => {
      getSearchSuggest(value).then((res) => {
        console.log("res", res);
      });
    }, 1000),
    []
  );

  const renderHeader = () => {
    return headerLinks.map((item) => {
      if (item.link.startsWith("/")) {
        return (
          <NavLink to={item.link} key={item.link}>
            <span>{item.title}</span>
            <span className="sprite_01 bottom-arrow"></span>
          </NavLink>
        );
      } else {
        return (
          <a href={item.link} key={item.link}>
            <span>{item.title}</span>
            <span className="sprite_01 hot"></span>
          </a>
        );
      }
    });
  };

  return (
    <div className={styles["app-header"]}>
      <div className="wrap-v1 header-wrap">
        <div className="left">
          <div className="sprite_01 logo"></div>
          <div className="nav">{renderHeader()}</div>
        </div>
        <div className="right">
          <Input
            prefix={<SearchOutlined />}
            placeholder="音乐/视频/电台/用户"
            className="search"
            addonAfter={null}
            onChange={(e) => handleSuggest(e.target.value)}
          />
          <div className="center">创作者中心</div>
          <div className="login" onClick={() => setVisible(true)}>
            登录
          </div>
        </div>
      </div>
      <LoginModal visible={visible} setVisible={setVisible} />
    </div>
  );
});

export default AppHeader;
