import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { Container, StyledLink, StyledImage } from "./searchPhotos.styles";

class SearchPhotos extends React.Component {
  state = {
    photoData: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  getPhotoData = async (searchTerm) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/search/photos?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ photoData: data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { searchTerm } = this.props;
    this.getPhotoData(searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getPhotoData(searchTerm);
    }
  }

  render() {
    const { searchTerm } = this.props;
    const { photoData } = this.state;
    const readyWithoutPhotos = photoData && photoData.total === 0;
    const readyWithPhotos = photoData && photoData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutPhotos && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {readyWithPhotos && (
          <Container>
            {photoData.results.map((photo) => {
              return (
                <StyledLink key={photo.id} to={`/photo/${photo.id}`}>
                  <StyledImage src={photo.urls.small} alt={photo.id} />
                </StyledLink>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default SearchPhotos;
