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

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/search`;

  getPhotoData = async (searchTerm) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/photos?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
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
    this.setState({ searchTerm });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getPhotoData(searchTerm);
      this.setState({ searchTerm });
    }
  }

  render() {
    const { photoData, searchTerm } = this.state;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {photoData && photoData.total === 0 && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {photoData && photoData.total > 0 && (
          <Container>
            {photoData.results.map((photo) => {
              return (<StyledLink to={`/photo/${photo.id}`}><StyledImage src={photo.urls.small} alt={photo.id} /></StyledLink>);
            })}
          </Container>
        )}
      </>
    );
  }
}

export default SearchPhotos;
