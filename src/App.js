import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Home,
  User,
  Photo,
  Search,
  Collection,
  Favorites,
  NotFound,
} from "pages";
import { SearchBar } from "components";
import { logo } from "assets";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyle } from "./global";
import { ThemeProvider } from "styled-components";
import { GiStripedSun } from "react-icons/gi";
import {
  StyledDiv,
  Logo,
  StyledNav,
  StyledUl,
  StyledLi,
  StyledLink,
  NavButtonLi,
  Overlay,
  StyledCamera,
  StyledHeart,
} from "./app.styles";
import "./App.css";

export class App extends React.Component {
  state = {
    stateTheme: true,
  };

  handleClick = () => {
    this.setState({ stateTheme: !this.state.stateTheme });
  };

  render() {
    const { stateTheme } = this.state;

    return (
      <ThemeProvider theme={stateTheme ? lightTheme : darkTheme}>
        <GlobalStyle />
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
                    <StyledLink
                      exact
                      to="/"
                      activeClassName={
                        stateTheme ? "activeLight" : "activeDark"
                      }
                    >
                      <Overlay>
                        <StyledCamera />
                      </Overlay>
                      <div>Photos</div>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi>
                    <StyledLink
                      to="/favorites"
                      activeClassName={
                        stateTheme ? "activeLight" : "activeDark"
                      }
                    >
                      <Overlay>
                        <StyledHeart />
                      </Overlay>
                      <div>Saved</div>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi onClick={this.handleClick}>
                    <Overlay>
                      <GiStripedSun />
                    </Overlay>
                    <div>Theme</div>
                  </NavButtonLi>
                </StyledUl>
              </StyledNav>
            </StyledDiv>

            <Switch>
              <Route component={Home} exact path="/"></Route>
              <Route component={User} exact path="/user/:username"></Route>
              <Route component={Photo} exact path="/photo/:photoid"></Route>
              <Route
                component={Search}
                exact
                path="/search/:searchTerm"
              ></Route>
              <Route component={Favorites} exact path="/favorites"></Route>
              <Route
                component={Collection}
                exact
                path="/collection/:collectionid"
              ></Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
