import React from "react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { FaHeart } from "react-icons/fa";
import { Photos, Collections, UserStats, Icon } from "components";
import { Container, Verified, InstagramUser, StyledSpan } from "./user.styles";

class User extends React.Component {
  state = {
    data: null,
    username: "",
    value: 0,
    isLoading: false,
    favoriteUsers: {},
  };

  loadingBar = React.createRef();

  retrieveUserData = async (username) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/users/${username}?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.retrieveUserData(username);
    this.setState({ username });
    let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers")) || {};
    this.setState({ favoriteUsers });
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleFavoriteClick = (id) => {
    if (this.state.favoriteUsers[id]) {
      const favoritesList = JSON.parse(localStorage.getItem("favoriteUsers"));
      delete favoritesList[id];
      this.setState({ favoriteUsers: favoritesList });
      localStorage.setItem("favoriteUsers", JSON.stringify(favoritesList));
    } else {
      const favoritesList = JSON.parse(localStorage.getItem("favoriteUsers"));
      const newFavoritesList = { ...favoritesList, [id]: id };
      this.setState({ favoriteUsers: newFavoritesList });
      localStorage.setItem("favoriteUsers", JSON.stringify(newFavoritesList));
    }
  };

  render() {
    const { data, value, username } = this.state;
    const isPhotos = value === 0;
    const isCollections = value === 1;
    const isStats = value === 2;
    const readyToLoad = this.state.data && !this.state.isLoading;
    return (
      <Container>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <img src={data.profile_image.large} alt={data.name} />
            <h1>{data.name}</h1>
            <StyledSpan>
              {this.state.favoriteUsers[data.username] ? (
                <Icon
                  id={data.username}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  color="#6958f2"
                  stats=""
                />
              ) : (
                <Icon
                  id={data.username}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  color="#000"
                  stats=""
                />
              )}
            </StyledSpan>
            {data.badge && <Verified>Verified ✓</Verified>}
            {data.bio && <h4>{data.bio}</h4>}
            {data.instagram_username && (
              <InstagramUser
                href={`https://www.instagram.com/${data.instagram_username}`}
                target="_blank"
              >
                @{data.instagram_username}
              </InstagramUser>
            )}
            <Paper square>
              <Tabs
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={this.handleChange}
              >
                <Tab label="Photos" />
                <Tab label="Collections" />
                <Tab label="Stats" />
              </Tabs>
              {isPhotos && <Photos username={username} />}
              {isCollections && <Collections username={username} />}
              {isStats && <UserStats username={username} />}
            </Paper>
          </>
        )}
      </Container>
    );
  }
}

export default User;
