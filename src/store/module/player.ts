import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrSongs } from "@/service/api/player";
import { RootState } from "..";

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
};

export const fetchCurrSongAction = createAsyncThunk<
  void,
  number,
  { state: RootState }
>("currentSong", (id, { dispatch, getState }) => {
  getCurrSongs(id).then((res) => {
    dispatch(changeCurrentSongAction(res.songs[0]));
  });
});

const initialState: playerType = {
  currentSong: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload;
    },
  },
});

export const { changeCurrentSongAction } = playerSlice.actions;
export default playerSlice.reducer;
