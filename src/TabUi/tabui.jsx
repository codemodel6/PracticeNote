import { useState } from "react";
import styles from "./tabui.module.scss";

export const TabUI = () => {
  // 현재 활성화된 탭을 찾는 state
  const [activeTab, setActiveTab] = useState(1);

  // 탭을 클릭할 때 호출되는 함수
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      <div
        className={activeTab === 1 ? styles.active : styles.inactive}
        onClick={() => handleTabClick(1)}
      >
        Tab 1
      </div>
      <div
        className={activeTab === 2 ? styles.active : styles.inactive}
        onClick={() => handleTabClick(2)}
      >
        Tab 2
      </div>
      <div
        className={activeTab === 3 ? styles.active : styles.inactive}
        onClick={() => handleTabClick(3)}
      >
        Tab 3
      </div>

      {/* 각 탭에 대한 내용 */}
      {activeTab === 1 && <div>지금의 탭 내용</div>}
      {activeTab === 2 && <div>안농</div>}
      {activeTab === 3 && <div>반가워</div>}
      <div className={styles.test1}>실험용</div>
    </div>
  );
};
