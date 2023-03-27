import React from "react";
import { useRoutes } from "react-router-dom";
import { FloatButton } from "antd";
import { routes } from "@/router";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import Player from "./pages/player";

export default function App() {
  return (
    <div>
      <AppHeader />
      <React.Suspense fallback="loading...">
        <div>{useRoutes(routes)}</div>
      </React.Suspense>
      <FloatButton.BackTop style={{ right: 150, bottom: 180 }} />
      <AppFooter />
      <Player />
    </div>
  );
}
