import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { ColumnBreaks } from "utils";
import {
  getCollectionData,
  // setFavoriteCollections,
  addCollectionAsFavorite,
} from "../../store/searchCollections/searchCollectionsActions";
import {
  StyledResponsiveMasonry,
  Container,
  Title,
  TitleContainer,
  CollectionLink,
  PreviewPhotos,
  Preview,
  StyledLink,
  Total,
} from "./searchCollections.styles.js";

class SearchCollections extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getCollectionData(searchTerm);
    // this.props.setFavoriteCollections();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.props.getCollectionData(searchTerm);
    }
  }

  handleFavoriteClick = (id) => {
    this.props.addCollectionAsFavorite(id);
  };

  render() {
    const { searchTerm } = this.props;
    const { collectionData } = this.props.searchCollections;
    const readyWithoutCollections =
      collectionData && collectionData.total === 0;
    const readyWithCollections = collectionData && collectionData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutCollections && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {readyWithCollections && (
          <StyledResponsiveMasonry
            columnsCountBreakPoints={ColumnBreaks}
            gutter="0"
          >
            <Masonry>
              {collectionData.results.map((collection) => {
                return (
                  <Container key={collection.id}>
                    <TitleContainer>
                      <CollectionLink to={`/collection/${collection.id}`}>
                        <Title>{collection.title}</Title>
                      </CollectionLink>
                      <Title>
                        {this.props.searchCollections.favoriteCollections[
                          collection.id
                        ] ? (
                          <Icon
                            id={collection.id}
                            handleFavoriteClick={this.handleFavoriteClick}
                            icon={<FaHeart />}
                            color="#6958f2"
                            stats=""
                          />
                        ) : (
                          <Icon
                            id={collection.id}
                            handleFavoriteClick={this.handleFavoriteClick}
                            icon={<FaHeart />}
                            color="#000"
                            stats=""
                          />
                        )}
                      </Title>
                    </TitleContainer>
                    <img
                      src={collection.cover_photo.urls.small}
                      alt={collection.title}
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
  searchCollections: state.searchCollections,
});

const mapDispatchToProps = {
  getCollectionData,
  // setFavoriteCollections,
  addCollectionAsFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCollections);
