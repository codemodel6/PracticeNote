/*
 * PROGRAM ID       : LineGraph
 * PROGRAM NAME     : 꺾은선 그래프
 * VERSION          : V0.1
 * DESCRIPTION      : 데이터를 받아 꺾은선 그래프로 표시해준다
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ZoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import { MainColor } from "../../GlobalCss/ColorNote";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ZoomPlugin,
  Filler,
  annotationPlugin
);

export const LineGraph = ({
  originalContents,
  modifyContents,
  time,
  second,
}) => {
  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 변수 기능 : 그래프의 옵션
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12, // 선 정보 글자 크기
          },
          color: "white",
        },
      },
      zoom: {
        pan: {
          enabled: true, // 마우스를 끌어서 위치 이동 가능
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true, // 마우스 휠로 확대 축소 가능
            speed: 0.1,
          },
          pinch: {
            enabled: true, // 터치할때 두 손가락으로 확대 축소 가능
          },
          mode: "xy",
        },

        // 그래프의 최소 최대 크기 정할 수 있음
        limits: {
          y: { max: "original", min: "original" },
          x: { max: "original", min: "original" },
        },
      },
      annotation: {
        drawTime: "afterDatasetsDraw",
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x",
            value: 0,
            borderColor: `${MainColor.Main200}`,
            borderWidth: 3,
            label: {
              content: "Time 0",
              enabled: true,
            },
          },
        ],
      },
      tooltip: {
        intersect: true, // 툴팁이 차트 요소와 교차하는 여부
        mode: "index", // 데이터 포인트의 인덱스에 따라 표시
        titleFont: { size: 15 },
        bodyFont: { size: 15 },
        position: "nearest", // 툴팁의 위치 설정
        bodySpacing: 10,
        padding: 10,
        callbacks: {
          title: (tooltipItems, data) => {
            // title을 'time: 값' 형식으로 변경
            return `Time: ${tooltipItems[0].label}`;
          },
          label: (tooltipItems) => {
            return `${tooltipItems.dataset.label}: ${Number(
              tooltipItems.raw
            ).toFixed(7)}`;
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "X Axis Label",
            font: {
              size: 1, // x 축 레이블 글자 크기
            },
          },
          ticks: {
            font: {
              size: 1, // x 축 레이블 글자 크기
            },
            color: "white", // x 축 레이블의 색상
          },
        },
        y: {
          title: {
            display: true,
            text: "Y Axis Label",
            font: {
              size: 1, // y 축 레이블 글자 크기
            },
          },
          ticks: {
            font: {
              size: 1, // y 축 눈금 글자 크기
            },
            color: "white",
          },
        },
      },
    },
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 변수 기능 : 그래프의 데이터
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const data = {
    labels: time,
    // labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    datasets: [
      {
        label: "Original",
        data: originalContents,
        // data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(177, 169, 170, 0.5)",
      },
      {
        label: "Optimal",
        data: modifyContents,
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line key={second} options={options} data={data} />;
};
