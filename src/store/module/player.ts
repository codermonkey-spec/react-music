import type { lyricType } from "@/utils/handle-player";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrSongs, getLyric } from "@/service/api/player";
import { RootState } from "..";
import { parseLyrics } from "@/utils/handle-player";

export type playerType = {
  /** 当前播放的歌曲 */
  currentSong?: {
    /** 歌曲名称 */
    name?: string;
    /** 歌曲id */
    id?: number;
    ar?: {
      /** 作者id */
      id?: number;
      /** 作者名称 */
      name?: string;
    }[];
    al?: {
      /** 封面图 */
      picUrl?: string;
    };
    /** 歌曲总时长 */
    dt?: number;
  };
  currentLyrics: lyricType[];
};

export const fetchCurrSongAction = createAsyncThunk<
  void,
  number,
  { state: RootState }
>("currentSong", (id, { dispatch, getState }) => {
  /** 获取歌曲信息 */
  getCurrSongs(id).then((res) => {
    dispatch(
      updateInitialState({
        label: "currentSong",
        value: res.songs[0],
      })
    );
  });

  /** 获取歌词信息 */
  getLyric(id).then((res) => {
    const lyricsArr = parseLyrics(res.lrc.lyric);
    dispatch(
      updateInitialState({
        label: "currentLyrics",
        value: lyricsArr,
      })
    );
  });
});

const initialState: playerType = {
  currentSong: {},
  currentLyrics: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateInitialState(
      state,
      { payload }: { payload: { label: keyof playerType; value: any } }
    ) {
      const { label, value } = payload;
      state[`${label}`] = value;
    },
  },
});

export const { updateInitialState } = playerSlice.actions;
export default playerSlice.reducer;
