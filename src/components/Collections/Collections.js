import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import unavilableCover from "assets/UnavailableCover.png";
import { retrieveCollections } from "../../store/userCollections/userCollectionsActions";
import {
  Container,
  StyledLink,
  StyledImage,
  Title,
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
    const readyWithCollections = collections && collections.length > 0;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithCollections ? (
          <Container>
            {collections.map((collection) => {
              let imageSrc = collection.cover_photo
                ? collection.cover_photo.urls.small
                : unavilableCover;
              return (
                <StyledLink
                  key={collection.id}
                  to={`/collection/${collection.id}`}
                >
                  <StyledImage src={imageSrc} alt={collection.title} />
                  <Title>{collection.title}</Title>
                </StyledLink>
              );
            })}
          </Container>
        ) : null}
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
