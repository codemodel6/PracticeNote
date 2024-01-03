/*
 * PROGRAM ID       : ScrollModal
 * PROGRAM NAME     : 모달
 * VERSION          : V0.1
 * DESCRIPTION      : 발전기, 여자기, 안정기, 조속기의 내용을 보여줄 모달
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainColor, FontSize, BlackColor } from "../../GlobalCss/ColorNote";
import { CancleButton, SubmitButton } from "../../GlobalCss/GlobalItem";

export const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &.open {
    display: block;
  }

  .ModalDataDiv {
    background-color: ${BlackColor.Black100};
    width: 500px;
    height: 750px;
    margin-bottom: 40px;
    border: 3px solid ${MainColor.Main200};
    overflow: scroll;
  }

  .ModalData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid ${MainColor.Main200};
    width: 100%;
    height: 50px;
    font-size: ${FontSize.large};
    transition: transform 0.15s ease-in-out; /* 애니메이션 추가 */

    &:hover {
      background-color: ${BlackColor.Black100};
      border-top: 2px solid ${MainColor.Main200};

      transform: translateY(-5px); /* 약간 위로 이동 */
    }

    &.CHK {
      background-color: ${MainColor.Main200};
      border-bottom: 2px solid ${BlackColor.Black100};
    }
  }

  .ButtonDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - CSS 기능 : 모달이 열렸을 경우 배경 설정
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ modalstate }) => (modalstate ? "block" : "none")};
  z-index: 999;
`;

const ScrollModal = ({
  modalstate,
  handleOnOff,
  modalData,
  setModalData,
  type,
  ArrItem,
}) => {
  const [multiData, setMultiData] = useState([]);
  const [singleData, setSingleData] = useState([]);

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 다중 상태에서의 모달 데이터 추가 삭제
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleMultiData = (item) => {
    if (multiData.includes(item)) {
      setMultiData(multiData.filter((it) => it !== item));
    } else setMultiData([...multiData, item]);
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 모달 값을 선택 후 등록버튼을 누를 시 선택한 값을 저장하는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleModalData = () => {
    if (type === "S") setModalData([...singleData]);
    if (type === "M") {
      // 알파벳 순으로 정렬 후 등록한다
      const sortArray = [...multiData].sort((a, b) => a.localeCompare(b));
      setModalData(sortArray);
    }
    handleOnOff();
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 싱글 상태에서의 모달 데이터 추가 삭제
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleSingleData = (item) => {
    setSingleData([item]);
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 취소 버튼을 눌렀을 때 모달을 닫는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleCancle = () => {
    setMultiData([...modalData]);
    handleOnOff();
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 훅 기능 : 타입 변경 시 모든 값 초기화
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  useEffect(() => {
    setSingleData([]);
    setMultiData([]);
  }, [type]);

  return (
    <Overlay modalstate={modalstate}>
      <ModalWrapper className={`${modalstate ? "open" : ""}`}>
        <div className="ModalDataDiv">
          {ArrItem.map((it, idx) => (
            <div key={idx}>
              {type === "M" ? (
                // 다중선택
                <div
                  className={`ModalData${
                    multiData && multiData.includes(it.data) ? " CHK" : ""
                  }`}
                  onClick={() => handleMultiData(it.data)}
                >
                  {it.data}
                </div>
              ) : (
                // 단일선택
                <div
                  className={`ModalData${
                    singleData && singleData.includes(it.data) ? " CHK" : ""
                  }`}
                  onClick={() => handleSingleData(it.data)}
                >
                  {it.data}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="ButtonDiv">
          <SubmitButton onClick={handleModalData}>등록</SubmitButton>
          <CancleButton onClick={handleCancle}>취소</CancleButton>
        </div>
      </ModalWrapper>
    </Overlay>
  );
};

export default ScrollModal;
