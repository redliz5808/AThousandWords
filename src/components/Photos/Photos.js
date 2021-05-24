import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { columnBreaks } from "utils";
import {
  retrieveUserPhotos,
  fetchData,
} from "store/userPhotos/userPhotosActions";
import {
  StyledParagraph,
  MainContainer,
  SubContainer,
  StyledLink,
  StyledImage,
} from "./photos.styles";

class Photos extends React.Component {
  state = {
    page: 1,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { page } = this.state;
    this.props.retrieveUserPhotos(this.props.username, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { username } = this.props;
    const { isLoading } = this.props.userPhotos;
    const { page } = this.state;

    if (prevProps.userPhotos.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.userPhotos.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevState.page !== page) {
      this.props.fetchData(username, page);
    }
  }

  updatePageNumber = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { photos } = this.props.userPhotos;
    const hasPhotos = photos.length;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {!hasPhotos && <div>This user has no photos</div>}
        {hasPhotos && (
          <InfiniteScroll
            dataLength={photos.length}
            next={this.updatePageNumber}
            hasMore={true}
            loader={<h4>Loading more photos...</h4>}
            endMessage={
              <StyledParagraph>
                There are no more photos to laod.
              </StyledParagraph>
            }
          >
            <MainContainer>
              <SubContainer>
                <ResponsiveMasonry
                  columnsCountBreakPoints={columnBreaks}
                  gutter="0"
                >
                  <Masonry>
                    {photos.map((photo) => {
                      return (
                        <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                          <StyledImage src={photo.urls.small} alt={photo.id} />
                        </StyledLink>
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              </SubContainer>
            </MainContainer>
          </InfiniteScroll>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userPhotos: state.userPhotos,
});

const mapDispatchToProps = {
  retrieveUserPhotos,
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
