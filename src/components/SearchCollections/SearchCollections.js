import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import {
  StyledDiv,
  CollectionLink,
  PreviewPhotos,
  Preview,
  StyledLink,
  Total,
} from "./searchCollections.styles.js";

class SearchCollections extends React.Component {
  state = {
    collectionData: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  getCollectionData = async (searchTerm) => {
    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/search`;

    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${baseUrl}/collections?query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getCollectionData(searchTerm);
    }
  }

  render() {
    const { searchTerm } = this.props;
    const { collectionData } = this.state;
    const readyWithoutCollections =
      collectionData && collectionData.total === 0;
    const readyWithCollections = collectionData && collectionData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutCollections && (
          <div>There are no results for {searchTerm}.</div>
        )}
        {readyWithCollections && (
          <StyledDiv>
            {collectionData.results.map((collection) => {
              return (
                <CollectionLink
                  key={collection.id}
                  to={`/collection/${collection.id}`}
                >
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
                  <Total>Total Photos: {collection.total_photos}</Total>
                  <StyledLink to={`/user/${collection.user.username}`}>
                    {collection.user.name}
                  </StyledLink>
                </CollectionLink>
              );
            })}
          </StyledDiv>
        )}
      </>
    );
  }
}

export default SearchCollections;
