import { configureStore, createSlice } from "@reduxjs/toolkit";

// createSlice는 하나의 useState이고 name = key, initialState = value 이다.
let user = createSlice({
  name: "user",
  initialState: "KimKyoungBae",
});

// reducer에서 가져오는 부분은 실제로 꺼낼 때 key: value가 된다.
export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
