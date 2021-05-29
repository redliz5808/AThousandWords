import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { CollectionPhotos } from "components";
import {
  getCollectionData,
} from "store/collection/collectionActions";
import {
  MainContainer,
  SubContainer,
  Title,
  CollectionName,
  Description,
  StyledLink,
  Tags,
  TagLink,
  UserPhoto,
  UserName,
} from "./collection.styles";

class Collection extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { collectionid } = this.props.match.params;
    this.props.getCollectionData(collectionid);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.collection;
    if (prevProps.collection.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.collection.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { data, isLoading } = this.props.collection;
    const readyToLoad = data && !isLoading;
    const tagsAvailable = data && data.tags.length > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <MainContainer>
            <SubContainer>
              <Title>
                <CollectionName>{data.title}</CollectionName>
              </Title>
              {data.description ? (
                <Description>{data.description}</Description>
              ) : null}
              <StyledLink to={`/user/${data.user.username}`}>
                <UserPhoto src={data.user.profile_image.small} />
                <UserName>{data.user.name}</UserName>
              </StyledLink>
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
            </SubContainer>
          </MainContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection,
});

const mapDispatchToProps = {
  getCollectionData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
