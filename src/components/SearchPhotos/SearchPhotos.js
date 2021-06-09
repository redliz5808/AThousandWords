import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { columnBreaks } from "utils";
import {
  getPhotoData,
  fetchData,
} from "store/searchPhotos/searchPhotosActions";
import {
  StyledParagraph,
  MainContainer,
  StyledLink,
  StyledImage,
  StyledDiv,
} from "./searchPhotos.styles";

class SearchPhotos extends React.Component {
  state = {
    page: 1,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    const { page } = this.state;
    this.props.getPhotoData(searchTerm, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchPhotos;
    const { page } = this.state;

    if (prevProps.searchTerm !== searchTerm) {
      this.props.getPhotoData(searchTerm, page);
    }

    if (prevProps.searchPhotos.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.searchPhotos.isLoading !== isLoading && !isLoading) {
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
    const { photoData, hasMore, isLoading } = this.props.searchPhotos;
    const hasPhotos = photoData.length > 0;
    const noResults = photoData.length === 0 && !isLoading;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {noResults && <div>There are no results for {searchTerm}.</div>}
        {hasPhotos && (
          <InfiniteScroll
            dataLength={photoData.length}
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
                  {photoData.map((photo) => {
                    return (
                      <StyledLink key={photo.id} to={`/photo/${photo.id}`}>
                        <StyledDiv backgroundColor={photo.color}>
                          <StyledImage src={photo.urls.small} alt={photo.id} />
                        </StyledDiv>
                      </StyledLink>
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
  searchPhotos: state.searchPhotos,
});

const mapDispatchToProps = {
  getPhotoData,
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotos);
