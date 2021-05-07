import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import {
  Container,
  ImageContainer,
  StyledLink,
  StyledResponsiveMasonry,
} from "./favoritePhoto.styles";

class FavoritePhoto extends React.Component {
  state = {
    photos: [],
    isLoading: false,
  };

  loadingBar = React.createRef();

  retrieveFavoritePhotos = async (favoritePhotos) => {
    this.loadingBar.current.continuousStart();
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
      this.loadingBar.current.complete();
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
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <StyledResponsiveMasonry
            columnsCountBreakPoints={ColumnBreaks}
            gutter="0"
          >
            <Masonry>
              {photos.map((photo) => {
                return (
                  <Container>
                    <ImageContainer>
                      <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                        <img src={photo.urls.small} alt={photo.description} />
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
