import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import unavilableCover from "assets/UnavailableCover.png";
import {
  Container,
  StyledDiv,
  Title,
  Description,
  Total,
  PreviewPhotos,
  Preview,
} from "./collections.styles";

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
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveCollections(this.props.username);
  }

  render() {
    const { collections } = this.state;
    const readyWithoutCollections = collections && collections.length === 0;
    const readyWithCollections = collections && collections.length > 0;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutCollections && (
          <div>This user does not have any collections.</div>
        )}
        {readyWithCollections && (
          <Container>
            {collections.map((collection) => {
              let imageSrc = collection.cover_photo
                ? collection.cover_photo.urls.small
                : unavilableCover;
              let previewPhotos = collection.preview_photos || [];
              return (
                <StyledDiv key={collection.id}>
                  <Title>{collection.title}</Title>
                  <img src={imageSrc} alt={collection.title} />
                  <PreviewPhotos>
                    {previewPhotos.map((preview) => {
                      return (
                        <Preview
                          key={preview.id}
                          src={preview.urls.thumb}
                          alt={preview.id}
                        />
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
