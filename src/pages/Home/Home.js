import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ImageModal } from "components";
import { ColumnBreaks } from "utils";
import {
  getAllPhotos,
  getParsed,
  setPage,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
} from "store/home/homeActions";
import {
  MainContainer,
  ChildContainer,
  SubContainer,
  ImageContainer,
  StyledImg,
} from "./home.styles";

class Home extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseNumbers: true,
      });
      this.props.getParsed(parsed);
      this.props.getAllPhotos(parsed.page);
    } else {
      const { page } = this.props.home;
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, isLoading } = this.props.home;

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
  }

  handleClick = (button) => {
    this.props.setPage(button);
  };

  handleImageClick = (id, index) => {
    const item = this.props.home.data.find((item) => item.id === id);
    if (item) this.props.handleImageClick(index);
  };

  render() {
    const { data, isLoading, showModal } = this.props.home;
    const readyToLoad = data && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <MainContainer>
            <ChildContainer>
              <ResponsiveMasonry
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
                              onClick={() =>
                                this.handleImageClick(value.id, index)
                              }
                              src={value.urls.small}
                              alt={value.alt_description}
                            />
                          </ImageContainer>
                        </SubContainer>
                      </LazyLoad>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
              {showModal && <ImageModal />}
            </ChildContainer>
          </MainContainer>
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
  setPage,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
