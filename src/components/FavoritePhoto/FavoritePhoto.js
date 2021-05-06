import React from "react";
import axios from "axios";
import { Container, ImageContainer, StyledLink } from "./favoritePhoto.styles";

class FavoritePhoto extends React.Component {
  state = {
    photos: [],
    isLoading: false,
  };

  retrieveFavoritePhotos = async (favoritePhotos) => {
    this.setState({ isLoading: true });
    try {
      const photos = await Promise.all(
        Object.values(favoritePhotos).map(async (photo) => {
          const { data } = await axios(
            `${process.env.REACT_APP_API_BASE_URL}/photos/${photo}?client_id=${process.env.REACT_APP_API_KEY}`
          );
          return data;
        })
      );
      this.setState({
        photos,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    let favoritePhotos =
      JSON.parse(localStorage.getItem("favoritePhotos")) || {};
    this.retrieveFavoritePhotos(favoritePhotos);
  }

  render() {
    const { photos, isLoading } = this.state;
    const readyToLoad = photos && !isLoading;
    return (
      readyToLoad &&
      photos.map((photo) => {
        return (
          <Container>
            <ImageContainer>
              <StyledLink to={`/photo/${photo.id}`}>
                <img src={photo.urls.small} alt={photo.description} />
              </StyledLink>
            </ImageContainer>
          </Container>
        );
      })
    );
  }
}

export default FavoritePhoto;
