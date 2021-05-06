import React from "react";
import axios from "axios";
import {
  ImageContainer,
  StyledLink,
  Title,
  PreviewPhotos,
  Preview,
  Total,
  CollectionContainer,
} from "./favoriteCollection.styles";

class FavoriteCollection extends React.Component {
  state = {
    collections: [],
    isLoading: false,
  };

  retrieveFavoriteCollections = async (favoriteCollections) => {
    this.setState({ isLoading: true });
    try {
      const collections = await Promise.all(
        Object.values(favoriteCollections).map(async (collection) => {
          const { data } = await axios(
            `${process.env.REACT_APP_API_BASE_URL}/collections/${collection}?client_id=${process.env.REACT_APP_API_KEY}`
          );
          return data;
        })
      );
      this.setState({
        collections,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    let favoriteCollections =
      JSON.parse(localStorage.getItem("favoriteCollections")) || {};
    this.retrieveFavoriteCollections(favoriteCollections);
  }

  render() {
    const { collections, isLoading } = this.state;
    const collectionsAreReady = collections && !isLoading;
    return (
      <>
        {collectionsAreReady &&
          collections.map((collection) => {
            return (
              <CollectionContainer key={collection.id}>
                <ImageContainer>
                  <StyledLink to={`/collection/${collection.id}`}>
                    <Title>{collection.title}</Title>
                  </StyledLink>
                  <img
                    src={collection.cover_photo.urls.small}
                    alt={collection.cover_photo.description}
                  />

                  <PreviewPhotos>
                    {collection.preview_photos.map((preview) => {
                      return (
                        <Preview
                          key={preview.id}
                          src={preview.urls.thumb}
                          alt={preview.id}
                        />
                      );
                    })}
                  </PreviewPhotos>
                  <Total>Total Photos: {collection.total_photos}</Total>
                  <StyledLink to={`/user/${collection.user.username}`}>
                    {collection.user.name}
                  </StyledLink>
                </ImageContainer>
              </CollectionContainer>
            );
          })}
      </>
    );
  }
}

export default FavoriteCollection;
