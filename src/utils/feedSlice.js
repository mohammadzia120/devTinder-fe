import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((feed) => feed._id !== action.payload);
      return newFeed;
    },
    removeFeeds: () => null,
  },
});

export const { addFeed, removeFeed, removeFeeds } = feedSlice.actions;
export default feedSlice.reducer;
