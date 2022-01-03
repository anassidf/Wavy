import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Explore from "./components/Explore";
import Navbar from "./components/Navbar";
import ShareForm from "./components/ShareForm";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";

import { Report } from "notiflix/build/notiflix-report-aio";
import UserAdditionDataForm from "./components/UserAdditionDataForm";
import TourGuides from "./components/TourGuides";
import Recommendations from "./components/Recommendations";
import Admin from "./components/admin/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";
function App() {
  useEffect(() => {
    console.log(window.location.href);
    if (window.location.href === "http://localhost:3000/") {
      Report.info(
        "Why Wavy",
        "The idea comes when we thougt that adventurers have kind of unstable life so we came up with wavy name",
        "Got it"
      );
    } else return;
  }, []);
  return (
    <Router>
      <div className=''>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/explore' component={Explore} />
          <Route exact path='/share' component={ShareForm} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile-page/:uid' component={ProfilePage} />
          <Route
            exact
            path='/additional_data_form/:uid'
            component={UserAdditionDataForm}
          />
          <Route exact path='/tour_guides/:place' component={TourGuides} />
          <Route exact path='/recommendations' component={Recommendations} />
          <Route exact path='/admin' component={Admin} />
          <Route path='/admin/dashboard' component={AdminDashboard} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
