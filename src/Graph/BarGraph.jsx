/*
 * PROGRAM ID       : BarGraph
 * PROGRAM NAME     : 막대 그래프
 * VERSION          : V0.1
 * DESCRIPTION      : 데이터를 받아 막대 그래프로 표시해준다
 * DESIGNER NAME    : 김경배
 * DEVELOPER NAME   : 김경배
 * CREATE DATE      : 2023/12/05
 * REVERSION HISTORY  :
 * Date         Ver     Name    Description
 * ----------   ------  ------  -------------------------
 * 2023/10/27   V1.0    김경배  초기버전
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { influenceData } from "../../../store/influenceSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ first, second, order }) => {
  // json에서 가져온 값을 리덕스에서 가져온다
  const reduxServerData = useSelector(
    (state) => state.influenceSlice.inGraphValue
  );
  const dispatch = useDispatch();

  // 리덕스에서 드롭다운과 버튼으로 선택한 값과 필요한 값들을 가져온다
  const xDataObj = reduxServerData[`('${first}', '${second}')`];
  const paramNameObj = reduxServerData["('Param_Name', '')"];
  const partNameObj = reduxServerData["('Part_Name', '')"];
  const partNumberObj = reduxServerData["('Part_Number', '')"];
  const partTypeObj = reduxServerData["('Part_Type', '')"];

  // 4개의 객체를 하나의 객체로 합친다
  const unionArr = [];
  for (const key in xDataObj) {
    unionArr.push({
      xData: xDataObj[key],
      paramName: paramNameObj[key],
      partName: partNameObj[key],
      partNumber: partNumberObj[key],
      partType: partTypeObj[key],
    });
  }

  let sortUnionArr = [];
  let maxData = 0;
  let minData = 0;

  // 오름차순일 경우 값 설정
  if (order === "up") {
    // 모든 값을 합친 배열 unionValue를 xData의 키에 대한 value로 오름차순/내림차순으로 정렬
    sortUnionArr = unionArr.sort((a, b) => a.xData - b.xData);
    // 그래프의 최대값과 최소값을 가져온다. Optional Chaining 연산자로 오류를 방지한다
    maxData = sortUnionArr[sortUnionArr.length - 1]?.xData;
    minData = sortUnionArr[0]?.xData;
  }

  // 내림차순일 경우 값 설정
  if (order === "down") {
    sortUnionArr = unionArr.sort((a, b) => b.xData - a.xData);
    maxData = sortUnionArr[0]?.xData;
    minData = sortUnionArr[sortUnionArr.length - 1]?.xData;
  }

  // 예외처리
  if (maxData <= 0) {
    maxData = 0;
  }

  // x축에 표시할 데이터를 배열로 만들어준다
  const labels = sortUnionArr.map((it) => it.paramName).filter(Boolean);

  // If0020A의 표를 바꿔주기 위해 리덕스로 값을 전달한다
  // 리덕스로 전달할 객체
  const sendReduxGraphData = [];
  // 반복문을 위한 키 객체
  const keyObj = {
    Excitation: "EXC",
    MachineGenerator: "GEN",
    TurbineGovernor: "GOV",
    Stabilizer: "STB",
  };
  for (let i = 0; i < sortUnionArr.length; i++) {
    for (let key in keyObj) {
      if (sortUnionArr[i].partType === keyObj[key]) {
        let newObj = {};
        newObj = {
          Part: key,
          MODEL_NM: sortUnionArr[i].partName,
          PARAM_NM: sortUnionArr[i].paramName,
          Data: sortUnionArr[i].xData,
        };
        sendReduxGraphData.push(newObj);
      }
    }
  }

  // 그래프 선택시에만 리덕스로 값 전달
  if (sendReduxGraphData.length !== 0) {
    dispatch(influenceData(sendReduxGraphData));
  }

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    - 변수 기능 : 그래프에 표시해 줄 데이터
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const data = {
    labels,
    datasets: [
      {
        label: "Influence",
        data: sortUnionArr.map((it) => it.xData),
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 1300],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    - 변수 기능 : 그래프의 옵션
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index", // 인덱스 모드를 사용하여 모든 데이터세트의 툴팁을 표시
    },
    plugins: {
      title: false,
      legend: false,
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
            // title을 'Parameter : 값' 형식으로 변경
            return `Parameter: ${tooltipItems[0].label}`;
          },
          label: (tooltipItems) => {
            if (tooltipItems.raw === (null || undefined)) return "";
            return `Influence: ${tooltipItems.raw.toFixed(7)}`;
          },
        },
      },
      scales: {
        y: [
          {
            display: true,
            type: "logarithmic",
          },
        ],
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
          // 이후 수정
          y: { max: "original", min: "original" },
          x: { max: "original", min: "original" },
        },
      },
    },
  };

  return <Bar key={first} options={options} data={data} />;
};

export default BarGraph;
