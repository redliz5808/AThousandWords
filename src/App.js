import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Home, User, Photo} from "pages";
import logo from "./assets/AThousandWords.png";
import { Logo } from "./app.styles";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user/:userid">User</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route component={(props) => <Home {...props} />} exact path="/"></Route>
          <Route component={User} path="/user/:userid"></Route>
          <Route component={Photo} path="/photo/:photoid"></Route>
        </Switch>
      </div>
    </Router>
  );
}
