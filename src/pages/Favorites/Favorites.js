import React from "react";
import axios from "axios";
import { Container, ImageContainer, StyledLink } from "./favorites.styles";

class Favorites extends React.Component {
  state = {
    photos: [],
    isLoading: false,
  };

  retrieveFavoritePhotos = (favoritePhotos) => {
    Object.values(favoritePhotos).map(async (photo) => {
      try {
        this.setState({ isLoading: true });
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/photos/${photo}?client_id=${process.env.REACT_APP_API_KEY}`
        );
        this.setState({
          photos: [...this.state.photos, data],
          isLoading: false,
        });
        console.log(this.state.photos);
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentDidMount() {
    let favoritePhotos = JSON.parse(localStorage.getItem("favoritePhotos"));
    this.retrieveFavoritePhotos(favoritePhotos);
  }

  render() {
    const { photos, isLoading } = this.state;
    return (
      <Container>
        {photos &&
          !isLoading &&
          photos.map((photo) => {
            return (
              <ImageContainer>
                <StyledLink to={`/photo/${photo.id}`}>
                  <img src={photo.urls.small} alt={photo.description} />
                </StyledLink>
              </ImageContainer>
            );
          })}
      </Container>
    );
  }
}

export default Favorites;
