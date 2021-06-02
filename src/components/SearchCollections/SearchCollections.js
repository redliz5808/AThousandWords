import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { columnBreaks } from "utils";
import {
  getCollectionData,
  fetchData,
} from "store/searchCollections/searchCollectionsActions";
import {
  StyledParagraph,
  MainContainer,
  Container,
  CollectionLink,
  StyledImage,
  StatsContainer,
  StatsOverlay,
  Stats,
} from "./searchCollections.styles.js";

class SearchCollections extends React.Component {
  state = {
    page: 1,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    const { page } = this.state;
    this.props.getCollectionData(searchTerm, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchCollections;

    if (prevProps.searchTerm !== searchTerm) {
      this.props.getCollectionData(searchTerm, page);
    }

    if (prevProps.searchCollections.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.searchCollections.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevState.page !== page) {
      this.props.fetchData(searchTerm, page);
    }
  }

  updatePageNumber = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { searchTerm } = this.props;
    const { collectionData, hasMore } = this.props.searchCollections;
    const haveCollections = collectionData.length;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {!haveCollections && <div>There are no results for {searchTerm}.</div>}
        {haveCollections && (
          <InfiniteScroll
            dataLength={collectionData.length}
            next={this.updatePageNumber}
            hasMore={hasMore}
            loader={<h4>Loading more results...</h4>}
            endMessage={
              <StyledParagraph>End of Search Results.</StyledParagraph>
            }
          >
            <MainContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={columnBreaks}
                gutter="0"
              >
                <Masonry>
                  {collectionData.map((collection) => {
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
            </MainContainer>
          </InfiniteScroll>
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
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCollections);
