import React from "react";
import axios from "axios";
import queryString from "query-string";
import LazyLoad from "react-lazyload";
import { Loading, Pagination } from "components";
import { Container, StyledLink } from "./home.styles";

class Home extends React.Component {
  state = {
    data: null,
    isLoading: false,
    page: 1,
  };

  retrievePhotos = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://api.unsplash.com/photos?page=${this.state.page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    if(this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search, {
        parseNumbers: true,
      });
      this.setState({ parsed });
    } else {
      const { page } = this.state;
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
      this.retrievePhotos();
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
      this.setState({ page: button });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const { page } = this.state;
      const query = queryString.stringify({ page });
      this.props.history.push(`/?${query}`);
    }
    
    if(prevProps.location.search !== this.props.location.search) {
      this.retrievePhotos();
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
          <>
            <Container>
              {Object.values(this.state.data).map((value) => {
                return (
                  <LazyLoad height={200}>
                    <StyledLink to={`/photo/${value.id}`}>
                      <img src={value.urls.small} alt={value.alt_description} />
                    </StyledLink>
                  </LazyLoad>
                );
              })}
            </Container>
            <Pagination handleClick={this.handleClick} />
          </>
        )}
      </>
    );
  }
}

export default Home;
