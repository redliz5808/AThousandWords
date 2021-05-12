import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import { getUserData } from "../../store/searchUsers/searchUsersActions";
import { StyledResponsiveMasonry, StyledLink, Bio } from "./searchUsers.styles";

class SearchUsers extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.getUserData(searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props;
    if (prevProps.searchTerm !== searchTerm) {
      this.props.getUserData(searchTerm);
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
          <StyledResponsiveMasonry
            columnsCountBreakPoints={ColumnBreaks}
            gutter="0"
          >
            <Masonry>
              {userData.results.map((user) => {
                return (
                  <StyledLink key={user.id} to={`/user/${user.username}`}>
                    <h3>{user.name}</h3>
                    <img src={user.profile_image.large} alt={user.name} />
                    {user.bio ? <Bio>{user.bio}</Bio> : null}
                  </StyledLink>
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
  searchUsers: state.searchUsers,
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
