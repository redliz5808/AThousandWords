import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, User, Photo, Search } from "pages";
import { SearchBar } from "components";
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
              <SearchBar />
            </StyledLi>
          </StyledUl>
        </StyledNav>

        <Switch>
          <Route component={Home} exact path="/"></Route>
          <Route component={User} path="/user/:username"></Route>
          <Route component={Photo} path="/photo/:photoid"></Route>
          <Route component={Search} path="/search/:searchTerm"></Route>
        </Switch>
      </div>
    </Router>
  );
}
