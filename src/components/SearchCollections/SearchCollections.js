import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import {
  getCollectionData,
  addCollectionAsFavorite,
} from "store/searchCollections/searchCollectionsActions";
import {
  Container,
  CollectionLink,
  StyledImage,
  StatsContainer,
  StatsOverlay,
  Stats,
} from "./searchCollections.styles.js";

class SearchCollections extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getCollectionData(searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchCollections;
    if (prevProps.searchTerm !== searchTerm) {
      this.props.getCollectionData(searchTerm);
    }
    if (prevProps.searchCollections.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.searchCollections.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
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
          <ResponsiveMasonry columnsCountBreakPoints={ColumnBreaks} gutter="0">
            <Masonry>
              {collectionData.results.map((collection) => {
                return (
                  <Container key={collection.id}>
                    <CollectionLink to={`/collection/${collection.id}`}>
                      <StyledImage
                        src={collection.cover_photo.urls.small}
                        alt={collection.title}
                      />
                      <StatsContainer>
                        <StatsOverlay>
                          <Stats>{collection.total_photos} photos</Stats>
                        </StatsOverlay>
                      </StatsContainer>
                    </CollectionLink>
                  </Container>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
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
  addCollectionAsFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCollections);
