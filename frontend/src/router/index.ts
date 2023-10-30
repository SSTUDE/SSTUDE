import MirrorMap from "../components/Main/MirrorMap";
import Mirror from "../components/Main/Mirror";
import Test from "../components/Test/Test";
import TestWidth from "../components/Test/TestWidth";
import TestHeight from "../components/Test/TestHeight";
import TestMain from "../components/Test/TestMain";
import Login from "../components/Login/Login";
import MenuBtn from "../components/Common/MenuBtn";

const routes = [
  {
    path : "/",
    Component : MirrorMap
  },
  
  {
    path : "/mirror",
    Component : Mirror
  },
  
  {
    path : "/test",
    Component : Test
  },
  {
    path : "/testwidth",
    Component : TestWidth
  },
  {
    path : "/testheight",
    Component : TestHeight
  },
  {
    path : "/testmain",
    Component : TestMain
  },

  {
    path : "/login",
    Component : Login
  },

  {
    path : "/menubtn",
    Component : MenuBtn,
    props: { type: 'menu' }
  },

]
 

export default routes;
