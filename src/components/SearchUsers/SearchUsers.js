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

  getUserData = async (searchTerm) => {
    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/search`;
  
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${baseUrl}/users?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getUserData(searchTerm);
    }
  }

  render() {
    const { searchTerm } = this.props;
    const { userData } = this.state;
    const readyWithoutUsers = userData && userData.total === 0;
    const readyWithUsers = userData && userData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutUsers && <div>There are no results for {searchTerm}.</div>}
        {readyWithUsers && (
          <Container>
            {userData.results.map((user) => {
              return (
                <StyledLink key={user.id} to={`/user/${user.username}`}>
                  <h3>{user.name}</h3>
                  <img src={user.profile_image.large} alt={user.name} />
                  {user.bio ? <Bio>{user.bio}</Bio> : null}
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
