import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import NoMatch from "./components/NoMatch";
import AdminCourse from "./pages/AdminCourse";
import AdminTeacher from "./pages/AdminTeacher";
import facade from "./api/userFacade";
import { LogIn, LoggedIn } from "./pages/Login";
import jwt_decode from "jwt-decode";
import Search from "./pages/Search";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  useEffect(() => {
    if (loggedIn) {
      const token = facade.getToken();
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
      console.log(user);
    }
  }, [loggedIn]);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return loggedIn === true && user.roles === "admin" ? (
            children
          ) : (
            <Redirect to="/login-out" />
          );
        }}
      />
    );
  }

  return (
    <div>
      <Router>
        <Navbar
          loginMsg={loggedIn ? "Logout" : "Login"}
          isLoggedIn={loggedIn}
          user={user}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/booking">
            <Search isLoggedIn={loggedIn} />
          </Route>
          <PrivateRoute path="/admin-course">
            <AdminCourse />
          </PrivateRoute>
          <PrivateRoute path="/admin-teacher">
            <AdminTeacher />
          </PrivateRoute>
          <Route path="/login-out">
            {!loggedIn ? (
              <LogIn login={login} />
            ) : (
              <div className="container-fluid padding">
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-6 text-center">
                    <LoggedIn />
                    <button className="btn btn-primary" onClick={logout}>
                      Logout
                    </button>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
            )}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
