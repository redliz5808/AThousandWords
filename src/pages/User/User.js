import React from "react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Photos, Collections, UserStats } from "components";
import { Verified, InstagramUser } from "./user.styles";

class User extends React.Component {
  state = {
    data: null,
    username: "",
    value: 0,
    isLoading: false,
  };

  loadingBar = React.createRef();

  retrieveUserData = async (username) => {
    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${baseUrl}/${username}?client_id=${process.env.REACT_APP_API_KEY}`
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
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { data, value, username } = this.state;
    const isPhotos = value === 0;
    const isCollections = value === 1;
    const isStats = value === 2;
    const readyToLoad = this.state.data && !this.state.isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <img src={data.profile_image.large} alt={data.name} />
            <h1>{data.name}</h1>
            {data.badge ? <Verified>Verified ✓</Verified> : null}
            {data.bio ? <h4>{data.bio}</h4> : null}
            {data.instagram_username ? (
              <InstagramUser
                href={`https://www.instagram.com/${data.instagram_username}`}
                target="_blank"
              >
                @{data.instagram_username}
              </InstagramUser>
            ) : null}
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
      </>
    );
  }
}

export default User;
