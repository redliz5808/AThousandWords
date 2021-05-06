import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { CollectionPhotos } from "components";
import { Container, StyledLink, Tags, TagLink } from "./collection.styles";

class Collection extends React.Component {
  state = {
    data: null,
    collections: [],
    isLoading: false,
  };

  loadingBar = React.createRef();

  retrieveData = async (collectionid) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { collectionid } = this.props.match.params;
    this.retrieveData(collectionid);
    let favoriteCollections =
      JSON.parse(localStorage.getItem("favoriteCollections")) || {};
    this.setState({ favoriteCollections });
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
    const { data } = this.state;
    const readyToLoad = this.state.data && !this.state.isLoading;
    const tagsAvailable = data && data.tags.length > 0;

    return (
      <Container>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <>
            <h1>{data.title}</h1>
            {data.description ? <h3>{data.description}</h3> : null}
            <StyledLink to={`/user/${data.user.username}`}>
              {data.user.name}
            </StyledLink>
            <div>
              {this.state.favoriteCollections[data.id] ? (
                <Icon
                  id={data.id}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  color="#6958f2"
                  stats=""
                />
              ) : (
                <Icon
                  id={data.id}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  color="#000"
                  stats=""
                />
              )}
            </div>
            <Tags>
              {tagsAvailable &&
                data.tags
                  .filter((tag, index) => index < 6)
                  .map((tag) => (
                    <TagLink key={tag.title} to={`/search/${tag.title}`}>
                      {tag.title}
                    </TagLink>
                  ))}
            </Tags>
            <CollectionPhotos collectionid={data.id} />
          </>
        )}
      </Container>
    );
  }
}

export default Collection;
