import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import { FaHeart } from "react-icons/fa";
import { Pagination, Icon } from "components";
import {
  MainContainer,
  StyledLink,
  SubContainer,
  ImageContainer,
} from "./home.styles";

class Home extends React.Component {
  state = {
    data: null,
    isLoading: false,
    page: 1,
    favoritePhotos: {},
  };

  loadingBar = React.createRef();

  retrievePhotos = async (page) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/photos?page=${page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseNumbers: true,
      });
      this.setState(parsed);
      this.retrievePhotos(parsed.page);
      let favoritePhotos =
        JSON.parse(localStorage.getItem("favoritePhotos")) || {};
      this.setState({ favoritePhotos });
    } else {
      const { page } = this.state;
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevState.page !== page) {
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
      this.retrievePhotos(page);
    }

    if (prevProps.location.search !== this.props.location.search) {
      this.retrievePhotos(page);
    }

    if (!this.props.location.search) {
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }
  }

  handleClick = (button) => {
    if (button === "Previous" && this.state.page === 1) {
      this.setState({ page: 1 });
    } else if (button === "Previous" && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else if (button === "Next") {
      this.setState({ page: this.state.page + 1 });
    } else {
      this.setState({ page: Number(button) });
    }
  };

  handleFavoriteClick = (id) => {
    if (this.state.favoritePhotos[id]) {
      const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
      delete favoritesList[id];
      this.setState({ favoritePhotos: favoritesList });
      localStorage.setItem("favoritePhotos", JSON.stringify(favoritesList));
    } else {
      const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
      const newFavoritesList = { ...favoritesList, [id]: id };
      this.setState({ favoritePhotos: newFavoritesList });
      localStorage.setItem("favoritePhotos", JSON.stringify(newFavoritesList));
    }
  };

  render() {
    const readyToLoad = this.state.data && !this.state.isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <MainContainer>
              {Object.values(this.state.data).map((value) => {
                return (
                  <LazyLoad height={200} key={value.id}>
                    <SubContainer>
                      <ImageContainer>
                        <StyledLink to={`/photo/${value.id}`}>
                          <img
                            src={value.urls.small}
                            alt={value.alt_description}
                          />
                        </StyledLink>
                        <StyledLink to={`/user/${value.user.username}`}>
                          <div>{value.user.name}</div>
                        </StyledLink>
                        {Object.values(this.state.favoritePhotos).find((id) => {
                          return id === value.id;
                        }) ? (
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
              <Pagination handleClick={this.handleClick} />
            </MainContainer>
          </>
        )}
      </>
    );
  }
}

export default Home;
