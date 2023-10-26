import Mirror from "../components/Mirror/Mirror";
import Test from "../components/Test/Test";
import TestWidth from "../components/Test/TestWidth";
import TestHeight from "../components/Test/TestHeight";


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
]
 

export default routes;
