import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, User, Photo, Search, Collection, Favorites } from "pages";
import { SearchBar } from "components";
import { logo } from "assets";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { GiStripedSun } from "react-icons/gi";
import {
  StyledDiv,
  Logo,
  StyledNav,
  StyledUl,
  StyledLi,
  StyledLink,
  NavButtonLi,
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
                <SearchBar />
              </StyledLi>
              <NavButtonLi>
                <StyledLink to="/">
                  <div>
                    <AiFillHome />
                  </div>
                  <div>Home</div>
                </StyledLink>
              </NavButtonLi>
              <NavButtonLi>
                <StyledLink to="/favorites">
                  <div>
                    <AiFillHeart />
                  </div>
                  <div>Favorites</div>
                </StyledLink>
              </NavButtonLi>
              <NavButtonLi>
                <div>
                  <GiStripedSun />
                </div>
                <div>Mode</div>
              </NavButtonLi>
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
