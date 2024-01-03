import "./App.css";
import { TabUI } from "./TabUI/Tabui.jsx";
import Cart from "./ShopingBag/Cart.jsx";
import GB from "./GB/GB.jsx";
import SaveLocal from "./saveLocal/SaveLocal";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched")) return;
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);
  return (
    <div>
      <div>h2</div>
      <TabUI />
      <GB />
      <SaveLocal />
    </div>
  );
}

export default App;
