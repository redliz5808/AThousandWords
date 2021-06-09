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
import { logo, cameraIcon, heartIcon, themeIcon } from "assets";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyle } from "./global";
import { ThemeProvider } from "styled-components";
import {
  StyledDiv,
  Logo,
  StyledNav,
  StyledUl,
  StyledLi,
  StyledLink,
  NavButtonLi,
  Overlay,
  StyledLabel,
  Photos,
  Saved,
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
                      <Overlay className="photos">
                        <Photos classname="photos" src={cameraIcon} alt="Photos" />
                      </Overlay>
                      <StyledLabel>Photos</StyledLabel>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi>
                    <StyledLink
                      to="/favorites"
                      activeClassName={
                        stateTheme ? "activeLight" : "activeDark"
                      }
                    >
                      <Overlay className="saved">
                        <Saved classname="saved" src={heartIcon} alt="Saved" />
                      </Overlay>
                      <StyledLabel>Saved</StyledLabel>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi onClick={this.handleClick}>
                    <Overlay>
                    <img src={themeIcon} alt="Theme" />
                    </Overlay>
                    <StyledLabel>Theme</StyledLabel>
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
