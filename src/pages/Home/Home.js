import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ImageModal } from "components";
import { ColumnBreaks } from "utils";
import {
  getAllPhotos,
  fetchData,
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
    this.props.getAllPhotos(1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.home;

    if (prevProps.home.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.home.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  handleImageClick = (id, index) => {
    const item = this.props.home.data.find((item) => item.id === id);
    if (item) this.props.handleImageClick(index);
  };

  render() {
    const { data, isLoading, showModal, page } = this.props.home;
    const readyToLoad = data && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <InfiniteScroll
            dataLength={data.length}
            next={() => this.props.fetchData(page + 1)}
            hasMore={true}
            loader={<h4>Loading more results...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
          </InfiniteScroll>
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
  fetchData,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
