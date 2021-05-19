import React from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
// import { FaHeart } from "react-icons/fa";
import { 
  Photos, 
  Collections, 
  // Icon,
} from "components";
import {
  setUserAsFavorite,
  retrieveUserData,
  setUsername,
} from "store/user/userActions";
import {
  MainContainer,
  UserContainer,
  UserName,
  Bio,
  StatsContainer,
  Container,
  StyledImage,
  InstagramUser,
  StyledDiv,
  StyledNumbers,
} from "./user.styles";

class User extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.retrieveUserData(username);
    this.props.setUsername(username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.user;
    if (prevProps.user.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.user.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleFavoriteClick = (id) => {
    this.props.setUserAsFavorite(id);
  };

  render() {
    const { data, username, isLoading } = this.props.user;
    const readyToLoad = data && !isLoading;

    const convertedNumbers = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
      <MainContainer>
        <Container>
          <LoadingBar color="#6958f2" ref={this.loadingBar} />
          {readyToLoad && (
            <>
              <UserContainer>
                <StyledImage src={data.profile_image.large} alt={data.name} />
                <UserName>{data.name}</UserName>
                {/* <span>
                  {this.props.user.favoriteUsers[data.username] ? (
                    <Icon
                      id={data.username}
                      handleFavoriteClick={this.handleFavoriteClick}
                      icon={<FaHeart />}
                      color="#6958f2"
                      stats=""
                    />
                  ) : (
                    <Icon
                      id={data.username}
                      handleFavoriteClick={this.handleFavoriteClick}
                      icon={<FaHeart />}
                      color="#000"
                      stats=""
                    />
                  )}
                </span> */}
                {data.bio && <Bio>{data.bio}</Bio>}
                {data.instagram_username && (
                  <InstagramUser
                    href={`https://www.instagram.com/${data.instagram_username}`}
                    target="_blank"
                  >
                    @{data.instagram_username}
                  </InstagramUser>
                )}
                <StatsContainer>
                  <StyledDiv>
                    <StyledNumbers>
                      {convertedNumbers(data.downloads)}
                    </StyledNumbers>
                    <div>Downloads</div>
                  </StyledDiv>
                  <StyledDiv>
                    <StyledNumbers>
                      {convertedNumbers(data.followers_count)}
                    </StyledNumbers>
                    <div>Followers</div>
                  </StyledDiv>
                  <StyledDiv>
                    <StyledNumbers>
                      {convertedNumbers(data.following_count)}
                    </StyledNumbers>
                    <div>Following</div>
                  </StyledDiv>
                </StatsContainer>
              </UserContainer>
              <Collections username={username} />
              <Photos username={username} />
            </>
          )}
        </Container>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserAsFavorite,
  retrieveUserData,
  setUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
