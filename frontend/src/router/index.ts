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
import Calender from "../components/Personal/Main/Calender";
import PreviousPersonalColorResults from "../components/Personal/Previous/PreviousPersonalColorResults";
import PreviousClothesResults from "../components/Personal/Previous/PreviousClothesResults";
// import GetWeatherData from "../components/Weather/GetWeatherData";
import Weather from "../components/Weather/Weather";
import Bus from "../components/Bus/Bus";
import BusDetail from "../components/Bus/BusDetail";
import KakaoMap from "../components/Bus/KakaoMap";

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
    path: "/personalmain",
    Component: Calender,
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
  // 카카오 지도
  {
    path: "/kakaomap",
    Component: KakaoMap,
  },
];

export default routes;
