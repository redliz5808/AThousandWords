import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import unavilableCover from "assets/UnavailableCover.png";
import { retrieveCollections } from "../../store/userCollections/userCollectionsActions";
import {
  Container,
  StyledLink,
  Title,
  Description,
  Total,
  PreviewPhotos,
  Preview,
} from "./collections.styles";

class Collections extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    this.props.retrieveCollections(this.props.username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.userCollections;
    if (prevProps.userCollections.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.userCollections.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { collections } = this.props.userCollections;
    const readyWithoutCollections = collections && collections.length === 0;
    const readyWithCollections = collections && collections.length > 0;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutCollections && (
          <div>This user does not have any collections.</div>
        )}
        {readyWithCollections && (
          <Container>
            {collections.map((collection) => {
              let imageSrc = collection.cover_photo
                ? collection.cover_photo.urls.small
                : unavilableCover;
              let previewPhotos = collection.preview_photos || [];
              return (
                <StyledLink
                  key={collection.id}
                  to={`/collection/${collection.id}`}
                >
                  <Title>{collection.title}</Title>
                  <img src={imageSrc} alt={collection.title} />
                  <PreviewPhotos>
                    {previewPhotos.map((preview) => {
                      return (
                        <Preview
                          key={preview.id}
                          src={preview.urls.thumb}
                          alt={preview.id}
                        />
                      );
                    })}
                  </PreviewPhotos>
                  <Description>{collection.description}</Description>
                  <Total>Total Photos: {collection.total_photos}</Total>
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
  userCollections: state.userCollections,
});

const mapDispatchToProps = {
  retrieveCollections,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
