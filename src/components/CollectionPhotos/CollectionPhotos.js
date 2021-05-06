import React from "react";
import axios from "axios";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { Container, StyledLink, StyledDiv } from "./collectionPhotos.styles";

class CollectionPhotos extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  retrieveCollectionPhotos = async (collectionid) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/collections/${collectionid}/photos?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { collectionid } = this.props;
    this.retrieveCollectionPhotos(collectionid);
  }

  render() {
    const { data, isLoading } = this.state;
    const readyWithPhotos = data && !isLoading;

    return (
      <>
        {readyWithPhotos && (
          <Container>
            {data.map((photo) => {
              return (
                <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                  <img src={photo.urls.small} alt={photo.alt_description} />
                  <StyledDiv>
                    <Icon icon={<FaHeart />} stats={photo.likes} />
                  </StyledDiv>
                </StyledLink>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default CollectionPhotos;
