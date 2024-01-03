/*
 * PROGRAM ID       : Spinner
 * PROGRAM NAME     : 스피너
 * VERSION          : V0.1
 * DESCRIPTION      : 로딩 시 로딩 중에 보여줄 화면
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import React, { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import styled from "styled-components";
import {
  BlackColor,
  FontSize,
  MainColor,
  SubColor,
} from "../../GlobalCss/ColorNote";
import axios from "axios";
import { URL } from "../../URL/URL";
import { useLocation } from "react-router-dom";

export const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 옅은 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 스피너가 가장 위에 나타나도록 설정 */
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: ${FontSize.xxlarge};
  /* background-color: orange; */

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${BlackColor.Black100};
    border: 3px solid ${MainColor.Main200};
    border-radius: 10px;
    margin-top: 60px;
    width: 60%;
    color: white;

    &:hover {
      background-color: ${SubColor.Sub200};
      border: 3px solid ${SubColor.Sub200};
    }
  }
  .watchPercentDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120%;
    font-weight: bold;
    font-size: 60px;
  }

  .watchInfoDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${BlackColor.Black100};
    border: 3px solid ${MainColor.Main200};
    border-radius: 10px;
    margin-top: 10px;
    width: 120%;
    height: 50px;
    color: white;
  }
`;

const Spinner = () => {
  const [loadingTime, setLoadingTime] = useState("");
  const [stopState, setStopState] = useState(false);
  const [stopClick, setStopClick] = useState("중단");
  const location = useLocation();

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 서버에서 학습 진행도를 가져오는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const pollData = async () => {
    const where = { where: location.pathname };
    try {
      const serverLoadingTime = await axios.post(`${URL}/loading/time`, where);

      const serverLoadingData = serverLoadingTime.data.loadingTime;

      setLoadingTime(serverLoadingData);
    } catch (error) {
      console.error(`데이터를 가져오는 중 오류 발생: ${error}`);
    }
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 종료 버튼 누를 시 파이썬 프로세스를 재시작 후 화면을 새로고침 하는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleStop = async () => {
    const where = { where: location.pathname };
    try {
      setStopClick("중단중..");
      const serverStop = await axios.post(`${URL}/loading/stop`, where);
      setStopState(true);
    } catch (error) {
      console.error("에러 발생 :", error.message);
    }
  };

  useEffect(() => {
    // 최초 폴링 요청 시작
    pollData();
  }, [location.pathname, stopState]);

  useEffect(() => {
    // stopState가 변경된 경우에만 pollData 호출
    if (!stopState) {
      const pollInterval = setInterval(() => {
        pollData(location.pathname === "/influence" ? "Inf" : "Opt");
      }, 1000);

      // 컴포넌트가 언마운트되면 clearInterval 호출하여 interval 제거
      return () => clearInterval(pollInterval);
    }
  }, [location.pathname, stopState]);

  return (
    <SpinnerOverlay>
      <SpinnerContainer>
        <Triangle
          height="300"
          width="300"
          color={MainColor.Main200}
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
        {loadingTime} %<button onClick={handleStop}>{stopClick}</button>
      </SpinnerContainer>
    </SpinnerOverlay>
  );
};

export default Spinner;
