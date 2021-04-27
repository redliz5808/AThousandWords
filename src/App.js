import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, User, Photo } from "pages";
import { SearchComponent } from "components";
import logo from "./assets/AThousandWords.png";
import { Logo, StyledNav, StyledUl, StyledLi, StyledLink } from "./app.styles";

export default function App() {
  return (
    <Router>
      <div>
        <StyledNav>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
          <StyledUl>
            <StyledLi>
              <StyledLink to="/">Home</StyledLink>
            </StyledLi>
            <StyledLi>
              <SearchComponent />
            </StyledLi>
            <StyledLi>
              <StyledLink to="/user/:userid">User</StyledLink>
            </StyledLi>
          </StyledUl>
        </StyledNav>

        <Switch>
          <Route component={Home} exact path="/"></Route>
          <Route component={User} path="/user/:userid"></Route>
          <Route component={Photo} path="/photo/:photoid"></Route>
        </Switch>
      </div>
    </Router>
  );
}
