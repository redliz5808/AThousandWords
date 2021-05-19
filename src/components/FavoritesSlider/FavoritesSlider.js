import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { retrievePhotos } from "store/favoriteSlider/favoriteSliderActions";
import {
  StyledSlider,
  Container,
  StyledImage,
  StyledH2,
  StyledDiv,
} from "./favoritesSlider.styles";

class FavoritesSlider extends Component {
  componentDidMount() {
    const photos = JSON.parse(localStorage.getItem("favoritePhotos")) || {};
    this.props.retrievePhotos(photos);
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
    const { photos, isLoading } = this.props.favoritesSlider;
    const readyToLoad = photos && !isLoading;
    return readyToLoad && photos.length > 0 ? (
      <StyledDiv>
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
      </StyledDiv>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  favoritesSlider: state.favoritesSlider,
});

const mapDispatchToProps = {
  retrievePhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesSlider);
