import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { Container, StyledLink, StyledImage } from "./photos.styles";

class Photos extends React.Component {
  state = {
    photos: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

  retrieveUserPhotos = async (username) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/${username}/photos?per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ photos: data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveUserPhotos(this.props.username);
  }

  render() {
    const { photos } = this.state;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {photos && photos.length === 0 && <div>This user has no photos</div>}
        {photos && photos.length > 0 && (
          <Container>
            {photos.map((photo) => {
              return (
                <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                  <StyledImage
                    src={photo.urls.small}
                    alt={photo.id}
                  />
                </StyledLink>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default Photos;
