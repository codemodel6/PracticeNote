import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  // 인자 state에는 reducer의 모든 state의 정보가 있다. state.key 로 값 가져오기 가능
  let a = useSelector((state) => {
    return state;
  });

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
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
