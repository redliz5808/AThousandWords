import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { getPhotoData } from "store/searchPhotos/searchPhotosActions";
import { MainContainer, StyledLink, StyledImage } from "./searchPhotos.styles";

class SearchPhotos extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getPhotoData(searchTerm);
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
    const { photoData } = this.props.searchPhotos;
    const readyWithoutPhotos = photoData && photoData.total === 0;
    const readyWithPhotos = photoData && photoData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutPhotos && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {readyWithPhotos && (
          <MainContainer>
            <ResponsiveMasonry
              columnsCountBreakPoints={ColumnBreaks}
              gutter="0"
            >
              <Masonry>
                {photoData.results.map((photo) => {
                  return (
                    <StyledLink key={photo.id} to={`/photo/${photo.id}`}>
                      <StyledImage src={photo.urls.small} alt={photo.id} />
                    </StyledLink>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </MainContainer>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotos);
