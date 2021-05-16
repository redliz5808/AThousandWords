import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import Masonry from "react-responsive-masonry";
import { Pagination, FavoritesSlider, ImageModal } from "components";
import { ColumnBreaks } from "utils";
import {
  getAllPhotos,
  getParsed,
  getFavorites,
  setPage,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
} from "store/home/homeActions";
import {
  StyledH2,
  SubContainer,
  ImageContainer,
  StyledResponsiveMasonry,
  StyledImg,
} from "./home.styles";

class Home extends React.Component {
  state = {
    showModal: false,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseNumbers: true,
      });
      this.props.getParsed(parsed);
      this.props.getAllPhotos(parsed.page);
      this.props.getFavorites();
    } else {
      const { page } = this.props.home;
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, isLoading, displayedImageId } = this.props.home;
    const { showModal } = this.state;

    if (prevProps.home.page !== page) {
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
      this.props.getAllPhotos(page);
    }

    if (prevProps.location.search !== this.props.location.search) {
      this.props.getAllPhotos(page);
    }

    if (!this.props.location.search) {
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }

    if (prevProps.home.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.home.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevState.showModal !== showModal && showModal) {
      this.props.displayPhoto(displayedImageId);
    }
  }

  handleClick = (button) => {
    this.props.setPage(button);
  };

  handleImageClick = (e) => {
    const item = this.props.home.data.filter((item) => item.id === e.target.id);
    if (item[0].id === e.target.id) {
      this.props.handleImageClick(e.target.id);
      this.setState({ showModal: true });
    }
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { data, isLoading } = this.props.home;
    const readyToLoad = data && !isLoading;
    const { showModal } = this.state;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <FavoritesSlider />
            <StyledH2>New Photos</StyledH2>
            <StyledResponsiveMasonry
              columnsCountBreakPoints={ColumnBreaks}
              gutter="0"
            >
              <Masonry>
                {Object.values(data).map((value, index) => {
                  return (
                    <LazyLoad height={200} key={value.id}>
                      <SubContainer>
                        <ImageContainer>
                          <StyledImg
                            onClick={this.handleImageClick}
                            id={value.id}
                            src={value.urls.small}
                            alt={value.alt_description}
                          />
                        </ImageContainer>
                      </SubContainer>
                    </LazyLoad>
                  );
                })}
              </Masonry>
            </StyledResponsiveMasonry>
            {showModal && (
              <ImageModal
                showModal={showModal}
                handleModalClose={this.handleModalClose}
              />
            )}
            <Pagination handleClick={this.handleClick} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
});

const mapDispatchToProps = {
  getAllPhotos,
  getParsed,
  getFavorites,
  setPage,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
