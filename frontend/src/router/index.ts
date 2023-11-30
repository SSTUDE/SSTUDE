import Mirror from "../components/Main/Mirror";
import Test from "../components/Test/Test";
import TestMain from "../components/Test/TestMain";
import TestColor from "../components/Test/TestColor";
import Login from "../components/Login/Login";
import MenuBtn from "../components/Common/MenuBtn";
import Calender from "../components/Personal/Main/PersonalCalender";
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
import TodayHealth from "../components/Health/TodayHealth";
import HealthCalender from "../components/Health/HealthCalender";
import PrevHealth from "../components/Health/PrevHealth";
import TodayHealthData from "../components/Health/TodayHealthData";
import Alarm from "../components/Common/Alarm";
import Welcome from "../components/Login/Welcome";

const routes = [
  {
    path: "/",
    Component: Login,
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
    path: "/testmain",
    Component: TestMain,
  },
  {
    path: "/testcolor",
    Component: TestColor,
  },

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/welcome",
    Component: Welcome,
  },

  {
    path: "/menubtn",
    Component: MenuBtn,
    props: { type: "menu" },
  },

  {
    path: "/personalmain",
    Component: Calender,
  },
  {
    path: "/personalcolorsresults",
    Component: PersonalColorResults,
  },
  {
    path: "/personalclothesresults",
    Component: ClothesResults,
  },
  {
    path: "/personalselectcontents",
    Component: SelectContents,
  },
  {
    path: "/personalselectpersonal",
    Component: PersonalColorCapture,
  },
  {
    path: "/personalselectclothes",
    Component: ClothesCapture,
  },
  {
    path: "/personalloading",
    Component: DiagnosisLoading,
  },
  {
    path: "/healthmain",
    Component: TodayHealth,
  },
  {
    path: "/healthcalender",
    Component: HealthCalender,
  },
  {
    path: "/prevhealth",
    Component: PrevHealth,
  },
  {
    path: "/healthmain",
    Component: TodayHealthData,
  },
  {
    path: "/weather",
    Component: Weather,
  },

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
  {
    path: "/kakaomap",
    Component: KakaoMap,
  },
  {
    path: "/alarm",
    Component: Alarm,
  },
];

export default routes;