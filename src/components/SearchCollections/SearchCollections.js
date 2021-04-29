import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import {
  StyledDiv,
  Container,
  PreviewPhotos,
  Preview,
  StyledLink,
} from "./searchCollections.styles.js";

class SearchCollections extends React.Component {
  state = {
    collectionData: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/search`;

  getCollectionData = async (searchTerm) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/collections?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ collectionData: data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { searchTerm } = this.props;
    this.getCollectionData(searchTerm);
    this.setState({ searchTerm });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getCollectionData(searchTerm);
      this.setState({ searchTerm });
    }
  }

  render() {
    const { collectionData, searchTerm } = this.state;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {collectionData && collectionData.total === 0 && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {collectionData && collectionData.total > 0 && (
          <StyledDiv>
            {collectionData.results.map((collection) => {
              return (
                <Container>
                  <h3>{collection.title}</h3>
                  <img
                    src={collection.cover_photo.urls.small}
                    alt={collection.title}
                  />
                  <PreviewPhotos>
                    {collection.preview_photos.map((preview) => {
                      return (
                        <Preview src={preview.urls.thumb} alt={preview.id} />
                      );
                    })}
                  </PreviewPhotos>
                  <p>Total Photos: {collection.total_photos}</p>
                  <StyledLink to={`/user/${collection.user.username}`}>{collection.user.name}</StyledLink>
                </Container>
              );
            })}
          </StyledDiv>
        )}
      </>
    );
  }
}

export default SearchCollections;
