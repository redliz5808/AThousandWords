import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { retrieveUserPhotos } from "store/userPhotos/userPhotosActions";
import {
  MainContainer,
  SubContainer,
  StyledLink,
  StyledImage,
} from "./photos.styles";

class Photos extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    this.props.retrieveUserPhotos(this.props.username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.userPhotos;
    if (prevProps.userPhotos.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.userPhotos.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { photos } = this.props.userPhotos;
    const readyWithoutPhotos = photos && photos.length === 0;
    const readyWithPhotos = photos && photos.length > 0;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutPhotos && <div>This user has no photos</div>}
        {readyWithPhotos && (
          <MainContainer>
            <SubContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={ColumnBreaks}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
