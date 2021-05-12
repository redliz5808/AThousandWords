import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { CollectionPhotos } from "components";
import { Container, StyledLink, Tags, TagLink } from "./collection.styles";
import { getCollectionData } from "../../store/collection/collectionActions";
import { setFavoritesData } from "../../store/collection/collectionActions";
import { getFavoritesData } from "../../store/collection/collectionActions";

class Collection extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { collectionid } = this.props.match.params;
    this.props.getCollectionData(collectionid);
    this.props.setFavoritesData();
  }

  handleFavoriteClick = (id) => {
    this.props.getFavoritesData(id);
  };

  render() {
    const { data, isLoading, favoriteCollections } = this.props.collection;
    const readyToLoad = data && !isLoading;
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
              {favoriteCollections[data.id] ? (
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

const mapStateToProps = (state) => ({
  collection: state.collection,
});

const mapDispatchToProps = {
  getCollectionData,
  getFavoritesData,
  setFavoritesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
