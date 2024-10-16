import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  likedArray: JSON.parse(window.localStorage.getItem('likedArray')) || [],
};

export const LikeSlice = createSlice({
  name: "LikeSlice",
  initialState,
  reducers: {
    addArray: (state, action) => {
      if (state.likedArray.map((item) => item.isLiked)) {
        const index = state.likedArray.findIndex(
          (item) => item.track.id === action.payload.track.id
        );
        if (index === -1) {
          state.likedArray.push({ ...action.payload, isLiked: true });
          toast.success("Music Liked");
        } else {
          state.likedArray[index].isLiked = true;
          toast.error('This Music Already Liked');
        }
        window.localStorage.setItem('likedArray', JSON.stringify(state.likedArray))
      }
    },
  },
});

export const { addArray } = LikeSlice.actions;
export default LikeSlice.reducer;
