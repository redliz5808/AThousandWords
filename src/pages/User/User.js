import React from "react";
import LoadingBar from "react-top-loading-bar";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Photos, Collections, UserStats, Icon } from "components";
import {
  setUserAsFavorite,
  retrieveUserData,
  setUsername,
  setFavoriteUsers,
} from "../../store/user/userActions";
import { Container, Verified, InstagramUser, StyledSpan } from "./user.styles";

class User extends React.Component {
  state = {
    value: 0,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.retrieveUserData(username);
    this.props.setUsername(username);
    this.props.setFavoriteUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.user;
    if (prevProps.user.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.user.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleFavoriteClick = (id) => {
    this.props.setUserAsFavorite(id);
  };

  render() {
    const { data, username, isLoading } = this.props.user;
    const { value } = this.state;
    const isPhotos = value === 0;
    const isCollections = value === 1;
    const isStats = value === 2;
    const readyToLoad = data && !isLoading;
    return (
      <Container>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <img src={data.profile_image.large} alt={data.name} />
            <h1>{data.name}</h1>
            <StyledSpan>
              {this.props.user.favoriteUsers[data.username] ? (
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

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserAsFavorite,
  retrieveUserData,
  setUsername,
  setFavoriteUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
