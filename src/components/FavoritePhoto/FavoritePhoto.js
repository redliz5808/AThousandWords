import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { retrieveFavoritePhotos } from "store/favoritePhoto/favoritePhotoActions";
import {
  MainContainer,
  ChildContainer,
  Container,
  ImageContainer,
  StyledLink,
  StyledImage,
} from "./favoritePhoto.styles";

class FavoritePhoto extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    this.props.retrieveFavoritePhotos();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.favoritePhoto;
    if (prevProps.favoritePhoto.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.favoritePhoto.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { photos, isLoading } = this.props.favoritePhoto;
    const readyToLoad = photos && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <MainContainer>
            <ChildContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={ColumnBreaks}
                gutter="0"
              >
                <Masonry>
                  {photos.map((photo) => {
                    return (
                      <Container key={photo.id}>
                        <ImageContainer>
                          <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                            <StyledImage
                              src={photo.urls.small}
                              alt={photo.description}
                            />
                          </StyledLink>
                        </ImageContainer>
                      </Container>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </ChildContainer>
          </MainContainer>
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
