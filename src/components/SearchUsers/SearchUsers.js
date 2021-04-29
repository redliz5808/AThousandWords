import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { Container, StyledLink, Bio } from "./searchUsers.styles";

class SearchUsers extends React.Component {
  state = {
    userData: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/search`;

  getUserData = async (searchTerm) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/users?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ userData: data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { searchTerm } = this.props;
    this.getUserData(searchTerm);
    this.setState({ searchTerm });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getUserData(searchTerm);
      this.setState({ searchTerm });
    }
  }

  render() {
    const { userData, searchTerm } = this.state;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {userData && userData.total === 0 && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {userData && userData.total > 0 && (
          <Container>
            {userData.results.map((user) => {
              return (
                <StyledLink to={`/user/${user.username}`}>
                  <h3>{user.name}</h3>
                  <img src={user.profile_image.large} alt={user.name} />
                  <Bio>{user.bio}</Bio>
                </StyledLink>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default SearchUsers;
