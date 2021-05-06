import React from "react";
import axios from "axios";
import {
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

  retrieveFavoriteUsers = async (favoriteUsers) => {
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
      readyToLoad &&
      users.map((user) => {
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
      })
    );
  }
}

export default FavoritePhoto;
