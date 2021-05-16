import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { retrieveFavoriteUsers } from "store/favoriteUser/favoriteUserActions";
import {
  StyledResponsiveMasonry,
  Container,
  ImageContainer,
  StyledLink,
  StyledDiv,
  StyledImage,
} from "./favoriteUser.styles";

class FavoritePhoto extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers")) || {};
    this.props.retrieveFavoriteUsers(favoriteUsers);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.favoriteUser;
    if (prevProps.favoriteUser.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.favoriteUser.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { users, isLoading } = this.props.favoriteUser;
    const readyToLoad = users && !isLoading;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyToLoad && (
          <StyledResponsiveMasonry
            columnsCountBreakPoints={ColumnBreaks}
            gutter="0"
          >
            <Masonry>
              {users.map((user) => {
                return (
                  <Container key={user.id}>
                    <ImageContainer>
                      <StyledLink to={`/user/${user.username}`}>
                        <StyledImage
                          src={user.profile_image.large}
                          alt={user.name}
                        />
                        <StyledDiv>{user.name}</StyledDiv>
                      </StyledLink>
                    </ImageContainer>
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

const mapStateToProps = (state) => ({
  favoriteUser: state.favoriteUser,
});

const mapDispatchToProps = {
  retrieveFavoriteUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePhoto);
