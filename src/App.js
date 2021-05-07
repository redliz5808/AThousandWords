import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, User, Photo, Search, Collection, Favorites } from "pages";
import { SearchBar } from "components";
import { logo } from "assets";
import {
  StyledDiv,
  Logo,
  StyledNav,
  StyledUl,
  StyledLi,
  StyledLink,
} from "./app.styles";

export default function App() {
  return (
    <Router>
      <div>
        <StyledDiv>
          <StyledNav>
            <Link to="/">
              <Logo src={logo} alt="logo" />
            </Link>
            <StyledUl>
              <StyledLi>
                <StyledLink to="/">Home</StyledLink>
              </StyledLi>
              <StyledLi>
                <StyledLink to="/favorites">Favorites</StyledLink>
              </StyledLi>
              <StyledLi>
                <SearchBar />
              </StyledLi>
            </StyledUl>
          </StyledNav>
        </StyledDiv>

        <Switch>
          <Route component={Home} exact path="/"></Route>
          <Route component={User} path="/user/:username"></Route>
          <Route component={Photo} path="/photo/:photoid"></Route>
          <Route component={Search} path="/search/:searchTerm"></Route>
          <Route component={Favorites} path="/favorites"></Route>
          <Route
            component={Collection}
            path="/collection/:collectionid"
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}
