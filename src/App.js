import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, User, Photo, Search, Collection, Favorites } from "pages";
import { SearchBar } from "components";
import { logo, logoInverse } from "assets";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyle } from "./global";
import { ThemeProvider } from "styled-components";
import { FaCamera } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
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

export class App extends React.Component {
  state = {
    stateTheme: true,
  };

  handleClick = () => {
    this.state.stateTheme
      ? this.setState({ stateTheme: false })
      : this.setState({ stateTheme: true });
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
                  <Logo
                    src={stateTheme ? logo : logoInverse}
                    alt="logo"
                  />
                </Link>
                <StyledUl>
                  <StyledLi>
                    <SearchBar />
                  </StyledLi>
                  <NavButtonLi>
                    <StyledLink to="/">
                      <div>
                        <FaCamera />
                      </div>
                      <div>Photos</div>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi>
                    <StyledLink to="/favorites">
                      <div>
                        <AiFillHeart />
                      </div>
                      <div>Saved</div>
                    </StyledLink>
                  </NavButtonLi>
                  <NavButtonLi onClick={this.handleClick}>
                    <div>
                      <GiStripedSun />
                    </div>
                    <div>Theme</div>
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
      </ThemeProvider>
    );
  }
}

export default App;
