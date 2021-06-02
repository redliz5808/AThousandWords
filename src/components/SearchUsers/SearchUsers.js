import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { userColumnBreaks } from "utils";
import { getUserData, fetchData } from "store/searchUsers/searchUsersActions";
import {
  MainContainer,
  SubContainer,
  StyledLink,
  Username,
  StyledImage,
  StyledParagraph,
  UsernameContainer,
  Overlay,
} from "./searchUsers.styles";

class SearchUsers extends React.Component {
  state = {
    page: 1,
  };

  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    const { page } = this.state;
    this.props.getUserData(searchTerm, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchTerm } = this.props;
    const { isLoading } = this.props.searchUsers;

    if (prevProps.searchTerm !== searchTerm) {
      this.props.getUserData(searchTerm, page);
    }

    if (prevProps.searchUsers.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }

    if (prevProps.searchUsers.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }

    if (prevState.page !== page) {
      this.props.fetchData(searchTerm, page);
    }
  }

  updatePageNumber = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { searchTerm } = this.props;
    const { userData, hasMore } = this.props.searchUsers;
    const haveUsers = userData.length;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {!haveUsers && <div>There are no results for {searchTerm}.</div>}
        {haveUsers && (
          <InfiniteScroll
            dataLength={userData.length}
            next={this.updatePageNumber}
            hasMore={hasMore}
            loader={<h4>Loading more results...</h4>}
            endMessage={
              <StyledParagraph>End of Search Results.</StyledParagraph>
            }
          >
            <MainContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={userColumnBreaks}
                gutter="0"
              >
                <Masonry>
                  {userData.map((user) => {
                    return (
                      <SubContainer key={user.id}>
                        <StyledLink to={`/user/${user.username}`}>
                          <StyledImage
                            src={user.profile_image.large}
                            alt={user.name}
                          />
                          <UsernameContainer>
                            <Overlay>
                              <Username>{user.name}</Username>
                            </Overlay>
                          </UsernameContainer>
                        </StyledLink>
                      </SubContainer>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </MainContainer>
          </InfiniteScroll>
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
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
