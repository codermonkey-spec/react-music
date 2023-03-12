import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Navigate } from "react-router-dom";

const Discover = lazy(() => import("@/pages/discover"));
const Friend = lazy(() => import("@/pages/friend"));
const Mine = lazy(() => import("@/pages/mine"));

const Recommend = lazy(() => import("@/pages/discover/recommend"));
const TopList = lazy(() => import("@/pages/discover/topList"));
const PlayList = lazy(() => import("@/pages/discover/playList"));
const Djradio = lazy(() => import("@/pages/discover/djradio"));
const Artist = lazy(() => import("@/pages/discover/artist"));
const Album = lazy(() => import("@/pages/discover/album"));

const prefix = "/discover";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/discover" />,
  },
  {
    path: `${prefix}`,
    element: <Discover />,
    children: [
      {
        path: `${prefix}`,
        element: <Navigate to={`${prefix}/recommend`} />,
      },
      {
        path: `${prefix}/recommend`,
        element: <Recommend />,
      },
      {
        path: `${prefix}/toplist`,
        element: <TopList />,
      },
      {
        path: `${prefix}/playlist`,
        element: <PlayList />,
      },
      {
        path: `${prefix}/djradio`,
        element: <Djradio />,
      },
      {
        path: `${prefix}/artist`,
        element: <Artist />,
      },
      {
        path: `${prefix}/album`,
        element: <Album />,
      },
    ],
  },
  {
    path: "/friend",
    element: <Friend />,
  },
  {
    path: "/mine",
    element: <Mine />,
  },
];
