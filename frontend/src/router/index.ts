import MirrorMap from "../components/Main/MirrorMap";
import Mirror from "../components/Main/Mirror";
import Test from "../components/Test/Test";
import TestWidth from "../components/Test/TestWidth";
import TestHeight from "../components/Test/TestHeight";
import TestMain from "../components/Test/TestMain";
import TestColor from "../components/Test/TestColor";
import WebSocket from "../components/Test/WebSocket";
import Login from "../components/Login/Login";
import MenuBtn from "../components/Common/MenuBtn";
import Calender from "../components/Personal/Main/PersonalCalender";
// import GetWeatherData from "../components/Weather/GetWeatherData";
import Weather from "../components/Weather/Weather";
import Bus from "../components/Bus/Bus";
import BusDetail from "../components/Bus/BusDetail";
import KakaoMap from "../components/Bus/KakaoMap";
import BusList from "../components/Bus/BusList";
import PersonalColorResults from "../components/Personal/Results/PersonalColor/PersonalColorResults";
import SelectContents from "../components/Personal/Capture/SelectContents";
import PersonalColorCapture from "../components/Personal/Capture/PersonalColorCapture";
import ClothesCapture from "../components/Personal/Capture/ClothesCapture";
import DiagnosisLoading from "../components/Personal/Results/DiagnosisLoading";
import ClothesResults from "../components/Personal/Results/Clothes/ClothesResults";
import TodayHealthCard from "../components/Health/TodayHealthCard";
import TodayHealth from "../components/Health/TodayHealth";

const routes = [
  {
    path: "/",
    Component: MirrorMap,
  },

  {
    path: "/mirror",
    Component: Mirror,
  },

  {
    path: "/test",
    Component: Test,
  },
  {
    path: "/testwidth",
    Component: TestWidth,
  },
  {
    path: "/testheight",
    Component: TestHeight,
  },
  {
    path: "/testmain",
    Component: TestMain,
  },
  {
    path: "/testcolor",
    Component: TestColor,
  },
  {
    path: "/websocket",
    Component: WebSocket,
  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/menubtn",
    Component: MenuBtn,
    props: { type: "menu" },
  },

  // 퍼스널 컬러 파트
  {
    // 퍼스널 컬러 메인
    path: "/personalmain",
    Component: Calender,
  },
  {
    // 퍼스널 컬러 진단 결과
    path: "/personalcolorsresults",
    Component: PersonalColorResults,
  },
  {
    // 의상 진단 결과
    path: "/personalclothesresults",
    Component: ClothesResults,
  },
  {
    // 진단 컨텐츠 선택창
    path: "/personalselectcontents",
    Component: SelectContents,
  },
  {
    // 퍼스널 컬러 캡쳐 선택창
    path: "/personalselectpersonal",
    Component: PersonalColorCapture,
  },
  {
    // 의상 캡쳐 선택창
    path: "/personalselectclothes",
    Component: ClothesCapture,
  },
  {
    // 진단 중 로딩창
    path: "/personalloading",
    Component: DiagnosisLoading,
  },
  // 삼성 헬스
  {
    path: "/healthmain",
    Component: TodayHealth,
  },
  {
    path: "/healthtest",
    Component: TodayHealthCard,
  },
  {
    path: "/weather",
    Component: Weather,
  },

  // 버스정보
  {
    path: "/bus",
    Component: Bus,
  },
  {
    path: "/busdetail",
    Component: BusDetail,
  },
  {
    path: "/buslist",
    Component: BusList,
  },
  // 카카오 지도
  {
    path: "/kakaomap",
    Component: KakaoMap,
  },
];

export default routes;
