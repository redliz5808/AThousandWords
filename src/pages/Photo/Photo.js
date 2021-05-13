import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { FaHeart, FaEye } from "react-icons/fa";
import { Icon } from "components";
import {
  retrievePhoto,
  setFavorites,
  setFavoriteImage,
} from "../../store/photo/photoActions";
import {
  MainImage,
  Container,
  StyledLink,
  UserImage,
  StyledDiv,
  TagLink,
  Tags,
} from "./photo.styles";

class Photo extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { photoid } = this.props.match.params;
    this.props.retrievePhoto(photoid);
    this.props.setFavorites();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.photo;
    if (prevProps.photo.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.photo.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  handleFavoriteClick = (id) => {
    this.props.setFavoriteImage(id);
  };

  render() {
    const { data } = this.props.photo;
    const tagsAvailable = data && data.tags.length > 0;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {data && (
          <Container>
            <StyledLink to={`/user/${data.user.username}`}>
              <UserImage
                src={data.user.profile_image.medium}
                alt={data.user.username}
              />
              <h4>{data.user.name}</h4>
            </StyledLink>
            <MainImage src={data.urls.regular} alt={data.alt_description} />
            <StyledDiv>
              {this.props.photo.favoritePhotos[data.id] ? (
                <Icon
                  id={data.id}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  stats={data.likes}
                  color="#6958f2"
                />
              ) : (
                <Icon
                  id={data.id}
                  handleFavoriteClick={this.handleFavoriteClick}
                  icon={<FaHeart />}
                  stats={data.likes}
                  color="#000"
                />
              )}
              <Icon icon={<FaEye />} stats={data.views} />
            </StyledDiv>
            <Tags>
              {tagsAvailable &&
                data.tags
                  .filter((tag, index) => index < 6)
                  .map((tag) => (
                    <TagLink key={tag.title} to={`/search/${tag.title}`}>
                      {tag.title}
                    </TagLink>
                  ))}
            </Tags>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  photo: state.photo,
});

const mapDispatchToProps = {
  retrievePhoto,
  setFavorites,
  setFavoriteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
