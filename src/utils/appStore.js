import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";
import RequestReducer from "./requestSlice";

export const appStore = configureStore({
  reducer: {
    user: UserReducer,
    feed: FeedReducer,
    connections: ConnectionReducer,
    requests: RequestReducer,
  },
});
