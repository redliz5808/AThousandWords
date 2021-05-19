import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { getUserData } from "store/searchUsers/searchUsersActions";
import {
  MainContainer,
  SubContainer,
  StyledLink,
  Username,
  StyledImage,
} from "./searchUsers.styles";

class SearchUsers extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getUserData(searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchUsers;
    if (prevProps.searchTerm !== searchTerm) {
      this.props.getUserData(searchTerm);
    }
    if (prevProps.searchUsers.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.searchUsers.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { searchTerm } = this.props;
    const { userData } = this.props.searchUsers;
    const readyWithoutUsers = userData && userData.total === 0;
    const readyWithUsers = userData && userData.total > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutUsers && <div>There are no results for {searchTerm}.</div>}
        {readyWithUsers && (
          <MainContainer>
            <ResponsiveMasonry
              columnsCountBreakPoints={ColumnBreaks}
              gutter="0"
            >
              <Masonry>
                {userData.results.map((user) => {
                  return (
                    <SubContainer>
                      <StyledLink key={user.id} to={`/user/${user.username}`}>
                        <StyledImage
                          src={user.profile_image.large}
                          alt={user.name}
                        />
                        <Username>{user.name}</Username>
                      </StyledLink>
                    </SubContainer>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </MainContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchUsers: state.searchUsers,
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
