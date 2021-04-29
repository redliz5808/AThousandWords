import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import {
  Container,
  StyledDiv,
  Title,
  Description,
  Total,
  PreviewPhotos,
  Preview,
} from "./collections.styles";
import unavilableCover from "../../assets/UnavailableCover.png";

class Collections extends React.Component {
  state = {
    collections: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

  retrieveCollections = async (username) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/${username}/collections?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ collections: data, isLoading: false });
      this.loadingBar.current.complete();
      console.log(this.state.collections)
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveCollections(this.props.username);
  }

  render() {
    const { collections } = this.state;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {collections && collections.length === 0 && <div>This user does not have any collections.</div>}
        {collections && collections.length > 0 && (
          <Container>
            {collections.map((collection) => {
              let imageSrc = "";
              if (!collection.cover_photo) {
                imageSrc = unavilableCover;
              } else if (collection.cover_photo) {
                imageSrc = collection.cover_photo.urls.small;
              }
              let previewPhotos = [];
              if (!collection.preview_photos) {
                previewPhotos = [];
              } else if (collection.preview_photos) {
                previewPhotos = collection.preview_photos;
              }
              return (
                <StyledDiv key={collection.id}>
                  <Title>{collection.title}</Title>
                  <img src={imageSrc} alt={collection.id} />
                  <PreviewPhotos>
                    {previewPhotos.map((preview) => {
                      return (
                        <Preview key={preview.id} src={preview.urls.thumb} alt={preview.id} />
                      );
                    })}
                  </PreviewPhotos>
                  <Description>{collection.description}</Description>
                  <Total>Total Photos: {collection.total_photos}</Total>
                </StyledDiv>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default Collections;
