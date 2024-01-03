import React, { useEffect } from "react";

const SaveLocal = () => {
  let obj = { name: "kim" };

  // localStorage에는 문자는 저장이 가능하지만 배열이나 객체는 저장할 수 없다
  // 그래서 JSON.stringfy로 배열이나 객체를 문자로 변환해준다.
  localStorage.setItem("data", JSON.stringify(obj));

  // localStorage에 저장된 문자를 다시 배열이나 객체로 변환해준다.
  let localData = localStorage.getItem("data");
  let a = JSON.parse(localData);
  console.log(a);

  // App.js에 useEffect로 localStroage에 watched라는 배열을 만든 후 상품을 볼 때 마다 배열에 값을 추가한다
  useEffect(() => {
    let Item = localStorage.getItem("watched");
    console.log(Item);
    Item = JSON.parse(Item);
    // Item.push(1);
    console.log(Item);
    localStorage.setItem("watched", JSON.stringify(Item));
    console.log("1", localStorage.getItem("watched"));
  }, []);
  return <div>ss</div>;
};

export default SaveLocal;
