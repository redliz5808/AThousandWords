import React from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import Loading from "../../components/Loading";
import { Container, StyledLink } from "./home.styles";

class Home extends React.Component {
  state = {
    data: null,
    isLoading: false,
    pageToLoad: 1,
  };

  retrievePhotos = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://api.unsplash.com/photos?page=${this.state.pageToLoad}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrievePhotos();
  }

  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        <Container>
          {this.state.data &&
            !this.state.isLoading &&
            Object.entries(this.state.data).map((entry) => {
              // eslint-disable-next-line no-unused-vars
              const [key, value] = entry;
              return (
                <LazyLoad height={200}>
                  <StyledLink to={`/photo/${value.id}`}>
                    <img src={value.urls.small} alt={value.alt_description} />
                  </StyledLink>
                </LazyLoad>
              );
            })}
        </Container>
      </>
    );
  }
}

export default Home;
