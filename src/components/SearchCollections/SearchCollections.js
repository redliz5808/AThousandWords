import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import {
  StyledResponsiveMasonry,
  Container,
  Title,
  TitleContainer,
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
    favoriteCollections: {},
  };

  loadingBar = React.createRef();

  getCollectionData = async (searchTerm) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/search/collections?query=${searchTerm}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
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
    let favoriteCollections =
      JSON.parse(localStorage.getItem("favoriteCollections")) || {};
    this.setState({ favoriteCollections });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.getCollectionData(searchTerm);
    }
  }

  handleFavoriteClick = (id) => {
    if (this.state.favoriteCollections[id]) {
      const favoritesList = JSON.parse(
        localStorage.getItem("favoriteCollections")
      );
      delete favoritesList[id];
      this.setState({ favoriteCollections: favoritesList });
      localStorage.setItem(
        "favoriteCollections",
        JSON.stringify(favoritesList)
      );
    } else {
      const favoritesList = JSON.parse(
        localStorage.getItem("favoriteCollections")
      );
      const newFavoritesList = { ...favoritesList, [id]: id };
      this.setState({ favoriteCollections: newFavoritesList });
      localStorage.setItem(
        "favoriteCollections",
        JSON.stringify(newFavoritesList)
      );
    }
  };

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
          <StyledResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 900: 2, 1285: 3 }}
            gutter="0"
          >
            <Masonry>
              {collectionData.results.map((collection) => {
                return (
                  <Container key={collection.id}>
                    <TitleContainer>
                      <CollectionLink to={`/collection/${collection.id}`}>
                        <Title>{collection.title}</Title>
                      </CollectionLink>
                      <Title>
                        {this.state.favoriteCollections[collection.id] ? (
                          <Icon
                            id={collection.id}
                            handleFavoriteClick={this.handleFavoriteClick}
                            icon={<FaHeart />}
                            color="#6958f2"
                            stats=""
                          />
                        ) : (
                          <Icon
                            id={collection.id}
                            handleFavoriteClick={this.handleFavoriteClick}
                            icon={<FaHeart />}
                            color="#000"
                            stats=""
                          />
                        )}
                      </Title>
                    </TitleContainer>
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
                  </Container>
                );
              })}
            </Masonry>
          </StyledResponsiveMasonry>
        )}
      </>
    );
  }
}

export default SearchCollections;
