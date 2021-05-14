import React from "react";
import { connect } from "react-redux";
import { Icon } from "components";
import { FaHeart } from "react-icons/fa";
import { retrieveCollectionPhotos } from "store/collectionPhoto/collectionPhotoActions";
import { Container, StyledLink, StyledDiv } from "./collectionPhotos.styles";

class CollectionPhotos extends React.Component {
  componentDidMount() {
    const { collectionid } = this.props;
    this.props.retrieveCollectionPhotos(collectionid);
  }

  render() {
    const { data, isLoading } = this.props.collectionPhoto;
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

const mapStateToProps = (state) => ({
  collectionPhoto: state.collectionPhoto,
});

const mapDispatchToProps = {
  retrieveCollectionPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPhotos);
