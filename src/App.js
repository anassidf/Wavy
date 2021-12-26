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
function App() {
  useEffect(() => {
    Report.info(
      "Why Wavy",
      "The idea comes when we thougt that adventurers have kind of unstable life so we came up with wavy name",
      "Got it"
    );
  }, []);
  return (
    <Router>
      <div className="">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/explore" component={Explore} />
          <Route exact path="/share" component={ShareForm} />
          <Route exact path="/profile-page" component={ProfilePage} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route
            exact
            path="/additional_data_form"
            component={UserAdditionDataForm}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
