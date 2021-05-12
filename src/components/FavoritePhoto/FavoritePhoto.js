import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { retrieveFavoritePhotos } from "../../store/favoritePhoto/favoritePhotoActions";
import {
  Container,
  ImageContainer,
  StyledLink,
  StyledResponsiveMasonry,
} from "./favoritePhoto.styles";

class FavoritePhoto extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    let favoritePhotos =
      JSON.parse(localStorage.getItem("favoritePhotos")) || {};
    this.props.retrieveFavoritePhotos(favoritePhotos);
  }

  render() {
    const { photos, isLoading } = this.props.favoritePhoto;
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
                  <Container key={photo.id}>
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

const mapStateToProps = (state) => ({
  favoritePhoto: state.favoritePhoto,
});

const mapDispatchToProps = {
  retrieveFavoritePhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePhoto);
