import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazyload";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { columnBreaks } from "utils";
import { ImageModal } from "components";
import {
  getAllPhotos,
  fetchData,
  setFavoriteImage,
  handleImageClick,
  displayPhoto,
} from "store/home/homeActions";
import {
  StyledParagraph,
  MainContainer,
  ChildContainer,
  SubContainer,
  ImageContainer,
  StyledImg,
} from "./home.styles";

class Home extends React.Component {
  state = {
    page: 1,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { page } = this.state;
    this.props.getAllPhotos(page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.home;
    const { page } = this.state;

    if (prevProps.home.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.home.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevState.page !== page) {
      this.props.fetchData(page);
    }
  }

  updatePageNumber = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleImageClick = (id, index) => {
    const item = this.props.home.data.find((item) => item.id === id);
    if (item) this.props.handleImageClick(index);
  };

  render() {
    const { data, showModal, hasMore } = this.props.home;
    
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {data.length && (
          <InfiniteScroll
            dataLength={data.length}
            next={this.updatePageNumber}
            hasMore={hasMore}
            loader={<h4>Loading more photos...</h4>}
            endMessage={
              <StyledParagraph>
                There are no more photos to load.
              </StyledParagraph>
            }
          >
            <MainContainer>
              <ChildContainer>
                <ResponsiveMasonry
                  columnsCountBreakPoints={columnBreaks}
                  gutter="0"
                >
                  <Masonry>
                    {data.map((value, index) => {
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
