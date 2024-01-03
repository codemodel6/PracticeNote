/*
 * PROGRAM ID       : MySlider
 * PROGRAM NAME     : 슬라이더
 * VERSION          : V0.1
 * DESCRIPTION      : 값을 편하게 보여주기 위한 슬라이더 % 현재 미사용 %
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import React from "react";
import "rc-slider/assets/index.css";
import styled from "styled-components";
import { FontSize, MainColor, SubColor } from "../../GlobalCss/ColorNote";

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 70%;
  height: 40px;
  background-color: orange;

  .mySliderDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
    margin-right: 10px;
  }

  .mySlider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 10px 7px 10px;
    background-color: white;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    border: 1px solid ${MainColor.Main100};

    .rc-slider-handle {
      background-color: white; /* 핸들의 배경 색상 변경 */
      border: 1px solid ${MainColor.Main100}; /* 핸들의 테두리 색상 변경 */
    }

    .rc-slider-handle:hover,
    .rc-slider-handle:active,
    .rc-slider-dragging .rc-slider-handle {
      background-color: ${MainColor.Main100}; /* 핸들의 배경 색상 변경 */
      border: 1px solid ${MainColor.Main100}; /* 핸들의 테두리 색상 변경 */
      box-shadow: 0 0 5px ${MainColor.Main100}; /* 핸들을 끌어당길 때의 빛나는 효과 색상 변경 */
    }

    .rc-slider-track {
      background-color: ${MainColor.Main100}; // 트랙의 배경 색상 변경
    }
    .rc-slider-rail {
      background-color: white;
    }
  }

  .selected {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${MainColor.Main100};

    input {
      width: 100%;
      height: 100%;
      background-color: white;
      border: 3px solid ${MainColor.Main100};
      font-size: ${FontSize.large};
      text-align: center;

      &:focus {
        outline: none;
        border: 3px solid ${SubColor.Sub100};
      }
    }

    // input의 type이 number일때 나오는 화살표 제거 코드
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const MySlider = ({ value, setValue, min, max, step }) => {
  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 소수점 4자리 예외처리 후 값 설정
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleChange = (newValue) => {
    if (!/^\d*\.?\d{0,4}$/.test(newValue)) {
      return;
    } else {
      setValue(newValue);
    }
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 기능 : 최대값 예외처리
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleBlur = () => {
    if (!/^\d*\.?\d{0,4}$/.test(value)) {
      alert(`소수점 4자리 까지 입력 가능합니다`);
      return;
    } else if (value > max) {
      alert(`최대 값은 ${max} 입니다`);
      setValue(max);
    }
  };

  return (
    <SliderWrapper>
      <div className="selected">
        <input
          type="number"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onBlur={handleBlur}
          value={value}
        />
      </div>
    </SliderWrapper>
  );
};

export default MySlider;
