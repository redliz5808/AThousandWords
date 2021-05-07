import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  StyledSlider,
  Container,
  StyledImage,
  StyledH2,
} from "./favoritesSlider.styles";

class FavoritesSlider extends Component {
  state = {
    photos: {},
  };

  retrievePhotos = async (photos) => {
    this.setState({ isLoading: true });
    try {
      const favoritePhotos = await Promise.all(
        Object.values(photos).map(async (photo) => {
          const { data } = await axios(
            `${process.env.REACT_APP_API_BASE_URL}/photos/${photo}?client_id=${process.env.REACT_APP_API_KEY}`
          );
          return data;
        })
      );
      this.setState({
        photos: favoritePhotos,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const photos = JSON.parse(localStorage.getItem("favoritePhotos")) || {};
    this.setState({ photos });
    this.retrievePhotos(photos);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    const { photos, isLoading } = this.state;
    const readyToLoad = photos && !isLoading;
    return (
      readyToLoad && (
        <div>
          {photos.length > 0 ? (
            <>
              <StyledH2>Your Favorite Photos</StyledH2>
              <StyledSlider {...settings}>
                {Object.values(photos).map((photo) => {
                  return (
                    <div key={photo.id}>
                      <Container>
                        <Link to={`/photo/${photo.id}`}>
                          <StyledImage
                            src={photo.urls.small}
                            alt={photo.description}
                          />
                        </Link>
                      </Container>
                    </div>
                  );
                })}
              </StyledSlider>
            </>
          ) : null}
        </div>
      )
    );
  }
}

export default FavoritesSlider;
