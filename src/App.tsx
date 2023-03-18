import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "@/router";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

export default function App() {
  return (
    <div>
      <AppHeader />
      <React.Suspense fallback="loading...">
        <div>{useRoutes(routes)}</div>
      </React.Suspense>
      <AppFooter />
    </div>
  );
}
