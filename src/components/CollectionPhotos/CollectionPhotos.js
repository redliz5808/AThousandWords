import React from "react";
import axios from "axios";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { Container, StyledLink, StyledDiv } from "./collectionPhotos.styles";

class CollectionPhotos extends React.Component {
  state = {
    data: null,
  };

  retrieveCollectionPhotos = async (collectionid) => {
    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/collections`;

    try {
      const { data } = await axios(
        `${baseUrl}/${collectionid}/photos?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { collectionid } = this.props;
    this.retrieveCollectionPhotos(collectionid);
  }

  render() {
    const { data } = this.state;
    const readyWithPhotos = data;

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
