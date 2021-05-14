import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { retrieveFavoriteCollections } from "store/favoriteCollection/favoriteCollectionActions";
import {
  StyledResponsiveMasonry,
  ImageContainer,
  StyledLink,
  Title,
  PreviewPhotos,
  Preview,
  Total,
  CollectionContainer,
} from "./favoriteCollection.styles";

class FavoriteCollection extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    let favoriteCollections =
      JSON.parse(localStorage.getItem("favoriteCollections")) || {};
    this.props.retrieveFavoriteCollections(favoriteCollections);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.favoriteCollection;
    if (prevProps.favoriteCollection.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.favoriteCollection.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { collections, isLoading } = this.props.favoriteCollection;
    const collectionsAreReady = collections && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {collectionsAreReady && (
          <StyledResponsiveMasonry
            columnsCountBreakPoints={ColumnBreaks}
            gutter="0"
          >
            <Masonry>
              {collections.map((collection) => {
                return (
                  <CollectionContainer key={collection.id}>
                    <ImageContainer>
                      <StyledLink to={`/collection/${collection.id}`}>
                        <Title>{collection.title}</Title>
                      </StyledLink>
                      <img
                        src={collection.cover_photo.urls.small}
                        alt={collection.cover_photo.description}
                      />

                      <PreviewPhotos>
                        {collection.preview_photos.map((preview) => {
                          return (
                            <Preview
                              key={preview.id}
                              src={preview.urls.thumb}
                              alt={preview.id}
                            />
                          );
                        })}
                      </PreviewPhotos>
                      <Total>Total Photos: {collection.total_photos}</Total>
                      <StyledLink to={`/user/${collection.user.username}`}>
                        {collection.user.name}
                      </StyledLink>
                    </ImageContainer>
                  </CollectionContainer>
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
  favoriteCollection: state.favoriteCollection,
});

const mapDispatchToProps = {
  retrieveFavoriteCollections,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCollection);
