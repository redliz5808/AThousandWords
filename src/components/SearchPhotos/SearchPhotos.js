import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { getPhotoData, fetchData } from "store/searchPhotos/searchPhotosActions";
import { MainContainer, StyledLink, StyledImage } from "./searchPhotos.styles";

class SearchPhotos extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getPhotoData(searchTerm, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchPhotos;
    if (prevProps.searchTerm !== searchTerm) {
      this.props.getPhotoData(searchTerm);
    }
    if (prevProps.searchPhotos.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.searchPhotos.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { searchTerm } = this.props;
    const { photoData, page } = this.props.searchPhotos;
    const readyWithoutPhotos = photoData && photoData.length === 0;
    const readyWithPhotos = photoData && photoData.length > 0;
    console.log(photoData)
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutPhotos && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {readyWithPhotos && (
          <InfiniteScroll
            dataLength={photoData.length}
            next={() => this.props.fetchData(searchTerm, page + 1)}
            hasMore={true}
            loader={<h4>Loading more results...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <MainContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={ColumnBreaks}
                gutter="0"
              >
                <Masonry>
                  {photoData.map((photo) => {
                    return (
                      <StyledLink key={photo.id} to={`/photo/${photo.id}`}>
                        <StyledImage src={photo.urls.small} alt={photo.id} />
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
