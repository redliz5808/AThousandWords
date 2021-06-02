import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { FaHeart, FaRegStar, FaStar, FaEye } from "react-icons/fa";
import { NotFound } from "pages";
import { Icon } from "components";
import { retrievePhoto, setFavoriteImage } from "store/photo/photoActions";
import {
  MainImage,
  Container,
  StyledLink,
  UserImage,
  StyledDiv,
  TagLink,
  Tags,
  ImageContainer,
} from "./photo.styles";

class Photo extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    const { photoid } = this.props.match.params;
    this.props.retrievePhoto(photoid);
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
    const { data, error, errorMessage } = this.props.photo;
    const tagsAvailable = data && data.tags.length > 0;
    const { setFavoriteImage } = this.props;

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {!error ? (
          data && (
            <Container>
              <StyledLink to={`/user/${data.user.username}`}>
                <UserImage
                  src={data.user.profile_image.medium}
                  alt={data.user.username}
                />
                <h4>{data.user.name}</h4>
              </StyledLink>
              <ImageContainer backgroundColor={data.color}>
                <MainImage src={data.urls.regular} alt={data.alt_description} />
              </ImageContainer>
              <StyledDiv>
                <Icon
                  id={data.id}
                  icon={<FaHeart />}
                  handleClick={() => this.props.setFavoriteImage(data.id)}
                  stats={data.likes}
                  color="#FF4557"
                  type="heart"
                />
                <Icon icon={<FaEye />} stats={data.views} />
                {this.props.photo.favoritePhotos[data.id] ? (
                  <Icon
                    id={data.id}
                    handleClick={() => setFavoriteImage(data.id)}
                    icon={<FaStar />}
                    stats=""
                    color="#F6CF58"
                    type="star"
                  />
                ) : (
                  <Icon
                    id={data.id}
                    handleClick={() => setFavoriteImage(data.id)}
                    icon={<FaRegStar />}
                    stats=""
                    color="#8c8c8c"
                    type="star"
                  />
                )}
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
          )
        ) : (
          <NotFound errorMessage={errorMessage} />
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
  setFavoriteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
