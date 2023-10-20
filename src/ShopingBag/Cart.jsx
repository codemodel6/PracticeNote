import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, rename } from "../store";

const Cart = () => {
  // 인자 state에는 reducer의 모든 state의 정보가 있다. state.key 로 값 가져오기 가능
  let cartList = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <div>
      {/* tbody = 헤드 tbody는 바디 영역을 뜻한다 */}
      {/* 테이블 태그에서 tr은 가로줄 th는 세로줄을 의미한다 */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((it, idx) => (
            <tr key={idx}>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>{it.count}</td>
              <button
                onClick={() => {
                  dispatch(changeName);
                }}
              >
                +
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
