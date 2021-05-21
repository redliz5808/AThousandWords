import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { getUserData, fetchData } from "store/searchUsers/searchUsersActions";
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
    this.props.getUserData(searchTerm, 1);
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
    const { userData, page } = this.props.searchUsers;
    const readyWithoutUsers = userData && userData.length === 0;
    const readyWithUsers = userData && userData.length > 0;
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutUsers && <div>There are no results for {searchTerm}.</div>}
        {readyWithUsers && (
          <InfiniteScroll
            dataLength={userData.length}
            next={() => this.props.fetchData(searchTerm, page + 1)}
            hasMore={true}
            loader={<h4>Loading more results...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <MainContainer>
              <ResponsiveMasonry
                columnsCountBreakPoints={ColumnBreaks}
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
                          <Username>{user.name}</Username>
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
