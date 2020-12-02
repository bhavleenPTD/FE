import React from 'react';
import routes from "./routes";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import Index9 from './pages/home/home';
import UserDashboard from './pages/dashboard/dashboard';
import AnnLocation from './pages/locations/bb_location';
import Index2 from './pages/Index2/Index2';
import {ToastContainer,toast} from 'react-toastify'
import GeoTiffTest from './pages/geotiff/test';

function App() {
  return (
    <React.Fragment>
 
      <Router>
            <Switch>
            <Redirect exact from="/" to="/home" />
              <Route path= "/dashboard" component={UserDashboard}/>
                <Route path="/home" component={Index9}/>
           
              {routes.map((route, idx) => (
                <Route path={route.path} component={route.component} key={idx} />
              ))}
            </Switch>
      </Router>
      <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
    </React.Fragment>
  );
}

export default App;
