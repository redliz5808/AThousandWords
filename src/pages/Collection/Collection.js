import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { CollectionPhotos } from "components";
import { Container, StyledLink, Tags, TagLink } from "./collection.styles";

class Collection extends React.Component {
  state = {
    data: null,
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
  }

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
            <Tags>
              {tagsAvailable &&
                data.tags.map((tag, index) => {
                  if (index < 6) {
                    return (
                      <TagLink key={tag.title} to={`/search/${tag.title}`}>
                        {tag.title}
                      </TagLink>
                    );
                  }
                  return null;
                })}
            </Tags>
            <CollectionPhotos collectionid={data.id} />
          </>
        )}
      </Container>
    );
  }
}

export default Collection;
