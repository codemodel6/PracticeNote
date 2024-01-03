/*
 * PROGRAM ID       : InputItem
 * PROGRAM NAME     : 모달 껍데기
 * VERSION          : V0.1
 * DESCRIPTION      : 모달을 보여주기 위한 버튼과 모달이 있는 컴포넌트
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import styled from "styled-components";
import { GlobalModalButton, GlobalModal } from "../../GlobalCss/GlobalItem";
import ScrollModal from "./ScrollModal";
import { useState } from "react";

const InputItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 2px;
`;

const InputItem = ({ modalData, setModalData, type, ArrItem }) => {
  const [modalstate, setModalstate] = useState(false);

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 모달을 끈다
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleOnOff = () => {
    setModalstate(!modalstate);
  };

  return (
    <InputItemDiv>
      <GlobalModal value={modalData} readOnly>
        {modalData.map((it, idx) => (
          <div className="modalResult" key={idx}>
            {it}
          </div>
        ))}
      </GlobalModal>
      <GlobalModalButton onClick={handleOnOff}>등록</GlobalModalButton>
      {/* 모달 컴포넌트 */}
      <ScrollModal
        modalstate={modalstate}
        handleOnOff={handleOnOff}
        modalData={modalData}
        setModalData={setModalData}
        type={type}
        ArrItem={ArrItem}
      />
    </InputItemDiv>
  );
};

export default InputItem;
