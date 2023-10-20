import { configureStore, createSlice } from "@reduxjs/toolkit";

// createSlice는 하나의 useState이고 name = key, initialState = value 이다.
let user = createSlice({
  name: "user",
  initialState: "KimKyoungBae",
  reducers: {
    changeName(state) {
      return "나는" + state;
    },
    rename(state) {
      return state;
    },
  },
});

// dispatch로 사용하기 위해 export 한다
export let { changeName, rename } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 20, 30],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 1 },
    { id: 1, name: "Gray and Red", count: 2 },
  ],
});

// reducer에서 가져오는 부분은 실제로 꺼낼 때 key: value가 된다.
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
