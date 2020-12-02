import Index1 from "./pages/Index1/Index1";
import Index2 from "./pages/Index2/Index2";
import Index3 from "./pages/Index3/Index3";
import Index4 from "./pages/Index4/Index4";
import Index5 from "./pages/Index5/Index5";
import Index6 from "./pages/Index6/Index6";
import Index7 from "./pages/Index7/Index7";
import Index8 from "./pages/ImageStitch/imageStitch";
import Index9 from "./pages/home/home";
import MapAnnotate from './pages/viewmap/mapAnnotate'
//Auth Pages
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import PasswordForget from "./pages/Auth/PasswordForget";
import MapSection from "./pages/viewmap/mapSection";
import UserDashboard from './pages/dashboard/dashboard'
import GeoTiffTest from "./pages/geotiff/test";
const routes = [
   
  { path: "/password-forget", component: PasswordForget },
  { path: "/login", component: Login },
  { path: "/sign-up", component: Signup },
  {path:"/password-forget" ,component:PasswordForget},
   {path:"/test",component:GeoTiffTest},{
     path:'/index8',component:Index5
   }

 
];

export default routes;
