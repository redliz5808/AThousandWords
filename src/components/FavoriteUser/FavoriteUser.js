import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import {
  StyledResponsiveMasonry,
  Container,
  ImageContainer,
  StyledLink,
  StyledDiv,
} from "./favoriteUser.styles";

class FavoritePhoto extends React.Component {
  state = {
    users: [],
    isLoading: false,
  };

  loadingBar = React.createRef();

  retrieveFavoriteUsers = async (favoriteUsers) => {
    this.loadingBar.current.continuousStart();
    this.setState({ isLoading: true });
    try {
      const users = await Promise.all(
        Object.values(favoriteUsers).map(async (user) => {
          const { data } = await axios(
            `${process.env.REACT_APP_API_BASE_URL}/users/${user}?client_id=${process.env.REACT_APP_API_KEY}`
          );
          return data;
        })
      );
      this.setState({
        users,
        isLoading: false,
      });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers")) || {};
    this.retrieveFavoriteUsers(favoriteUsers);
  }

  render() {
    const { users, isLoading } = this.state;
    const readyToLoad = users && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <StyledResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 900: 2, 1285: 3 }}
            gutter="0"
          >
            <Masonry>
              {users.map((user) => {
                return (
                  <Container key={user.id}>
                    <ImageContainer>
                      <StyledLink to={`/user/${user.username}`}>
                        <img src={user.profile_image.large} alt={user.name} />
                        <StyledDiv>{user.name}</StyledDiv>
                      </StyledLink>
                    </ImageContainer>
                  </Container>
                );
              })}
            </Masonry>
          </StyledResponsiveMasonry>
        )}
      </>
    );
  }
}

export default FavoritePhoto;
