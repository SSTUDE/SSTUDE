import Mirror from "../components/Main/Mirror";
import Test from "../components/Test/Test";
import TestWidth from "../components/Test/TestWidth";
import TestHeight from "../components/Test/TestHeight";
import Login from "../components/Login/Login";
import Test1 from "../components/Test/Test1";


const routes = [
  {
    path : "/",
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
    path : "/login",
    Component : Login
  },
  {
    path : "/test1",
    Component : Test1
  },
]
 

export default routes;
