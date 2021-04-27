import React from "react";
import axios from "axios";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import { FaHeart } from "react-icons/fa";
import { Loading, Pagination, UserComponent, Icon } from "components";
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
  };

  retrievePhotos = async (page) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://api.unsplash.com/photos?page=${page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
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

  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
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
                        <StyledLink to={`/user/${value.user.id}`}>
                          <UserComponent username={value.user.name} />
                        </StyledLink>
                        <Icon icon={<FaHeart />} stats={value.likes} />
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
