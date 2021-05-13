import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import Masonry from "react-responsive-masonry";
import { FaHeart } from "react-icons/fa";
import { Pagination, Icon, FavoritesSlider } from "components";
import { ColumnBreaks } from "utils";
import {
  getAllPhotos,
  setParsed,
  setFavorites,
  setPage,
  setFavoriteImage,
} from "../../store/home/homeActions";
import {
  StyledH2,
  StyledLink,
  SubContainer,
  ImageContainer,
  StyledResponsiveMasonry,
  StyledImg,
} from "./home.styles";

class Home extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseNumbers: true,
      });
      this.props.setParsed(parsed);
      this.props.getAllPhotos(parsed.page);
      this.props.setFavorites();
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

  handleFavoriteClick = (id) => {
    this.props.setFavoriteImage(id);
  };

  handleHeartclick = () => {
    this.setState({ isClick: !this.props.home.isClick });
  };

  render() {
    const { data, isLoading } = this.props.home;
    const readyToLoad = data && !isLoading;
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
                {Object.values(data).map((value) => {
                  return (
                    <LazyLoad height={200} key={value.id}>
                      <SubContainer>
                        <ImageContainer>
                          <StyledLink to={`/photo/${value.id}`}>
                            <StyledImg
                              src={value.urls.small}
                              alt={value.alt_description}
                            />
                          </StyledLink>
                          <StyledLink to={`/user/${value.user.username}`}>
                            <div>{value.user.name}</div>
                          </StyledLink>
                          {this.props.home.favoritePhotos[value.id] ? (
                            <Icon
                              id={value.id}
                              handleFavoriteClick={this.handleFavoriteClick}
                              icon={<FaHeart />}
                              stats={value.likes}
                              color="#6958f2"
                            />
                          ) : (
                            <Icon
                              id={value.id}
                              handleFavoriteClick={this.handleFavoriteClick}
                              icon={<FaHeart />}
                              stats={value.likes}
                              color="#000"
                            />
                          )}
                        </ImageContainer>
                      </SubContainer>
                    </LazyLoad>
                  );
                })}
              </Masonry>
            </StyledResponsiveMasonry>
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
  setParsed,
  setFavorites,
  setPage,
  setFavoriteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
