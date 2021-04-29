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

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

  loadingBar = React.createRef();

  retrieveUserData = async (username) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/${username}?client_id=${process.env.REACT_APP_API_KEY}`
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
    const { data, value } = this.state;
    const isPhotos = value === 0;
    const isCollections = value === 1;
    const isStats = value === 2;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {this.state.data && !this.state.isLoading && (
          <>
            <img src={data.profile_image.large} alt={data.name} />
            <h1>{data.name}</h1>
            {data.badge ? <Verified>Verified ✓</Verified> : ""}
            <h3>{data.bio}</h3>
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
              {isPhotos && <Photos username={this.state.username} />}
              {isCollections && <Collections username={this.state.username} />}
              {isStats && <UserStats username={this.state.username} />}
            </Paper>
          </>
        )}
      </>
    );
  }
}

export default User;
