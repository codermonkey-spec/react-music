import type { lyricType } from "@/utils/handle-player";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrSongs, getLyric } from "@/service/api/player";
import { RootState, AppDispatch, AppGetState } from "..";
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

  /** 当前播放音乐的歌词 */
  currentLyrics: lyricType[];
  /** 当前播放到的音乐歌词的下标 */
  currentLyricsIndex: number;
  /** 所有歌曲的播放列表 */
  playSongsList: playerType["currentSong"][];
  /** 当前正在播放的歌曲索引 */
  playSongIndex: number;
  /** 播放模式 0顺序播放 1随机播放 2单独循环 */
  playMode: 0 | 1 | 2;
};

const handleCurrSongs = (
  id: number,
  dispatch: AppDispatch,
  getState: AppGetState
) => {
  const { player: { playSongsList = [] } = {} } = getState();
  const index = playSongsList.findIndex((item) => item?.id === id);
  if (index > 0) {
    dispatch(
      updateInitialState({ label: "currentSong", value: playSongsList[index] })
    );
    dispatch(updateInitialState({ label: "playSongIndex", value: index }));
  } else {
    getCurrSongs(id).then((res) => {
      dispatch(
        updateInitialState({
          label: "currentSong",
          value: res.songs[0],
        })
      );

      dispatch(
        updateInitialState({
          label: "playSongsList",
          value: [...playSongsList, res.songs[0]],
        })
      );

      dispatch(
        updateInitialState({
          label: "playSongIndex",
          value: playSongsList.length,
        })
      );
    });
  }
};

const handleLyrics = (id: number, dispatch: AppDispatch) => {
  getLyric(id).then((res) => {
    const lyricsArr = parseLyrics(res.lrc.lyric);
    dispatch(
      updateInitialState({
        label: "currentLyrics",
        value: lyricsArr,
      })
    );
  });
};

export const fetchCurrSongAction = createAsyncThunk<
  void,
  number,
  { state: RootState }
>("currentSong", (id, { dispatch, getState }) => {
  /** 获取歌曲信息 */
  handleCurrSongs(id, dispatch as AppDispatch, getState);

  /** 获取歌词信息 */
  handleLyrics(id, dispatch as AppDispatch);
});

const initialState: playerType = {
  currentSong: {},
  currentLyrics: [],
  currentLyricsIndex: -1,
  playSongsList: [],
  playSongIndex: -1,
  playMode: 0,
};

export const changePlaySongAction = createAsyncThunk<
  void,
  boolean,
  { state: RootState }
>("playsong", (isNext, { dispatch, getState }) => {
  const { playMode, playSongIndex, playSongsList } = getState().player;
  const length = playSongsList.length;
  let newIndex = playSongIndex;
  if (playMode === 1) {
    newIndex = Math.floor(Math.random() * length);
  } else if (playMode === 0) {
    if (isNext) newIndex += 1;
    else newIndex -= 1;
    if (newIndex > length - 1) newIndex = 0;
    if (newIndex < 0) newIndex = length - 1;
  }

  const currentSong = playSongsList[newIndex];
  dispatch(
    updateInitialState({
      label: "currentSong",
      value: currentSong,
    })
  );

  dispatch(
    updateInitialState({
      label: "playSongIndex",
      value: newIndex,
    })
  );

  if (currentSong?.id) {
    handleLyrics(currentSong?.id, dispatch as AppDispatch);
  }
});

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
