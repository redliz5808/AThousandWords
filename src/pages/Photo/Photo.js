import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { FaHeart, FaEye } from "react-icons/fa";
import { Icon } from "components";
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
  state = {
    data: null,
    isLoading: false,
    favoritePhotos: {},
  };

  loadingBar = React.createRef();

  retrievePhoto = async (photoid) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/photos/${photoid}?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { photoid } = this.props.match.params;
    this.retrievePhoto(photoid);
    let favoritePhotos =
      JSON.parse(localStorage.getItem("favoritePhotos")) || {};
    this.setState({ favoritePhotos });
  }

  handleFavoriteClick = (id) => {
    if (this.state.favoritePhotos[id]) {
      const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
      delete favoritesList[id];
      this.setState({ favoritePhotos: favoritesList });
      localStorage.setItem("favoritePhotos", JSON.stringify(favoritesList));
    } else {
      const favoritesList = JSON.parse(localStorage.getItem("favoritePhotos"));
      const newFavoritesList = { ...favoritesList, [id]: id };
      this.setState({ favoritePhotos: newFavoritesList });
      localStorage.setItem("favoritePhotos", JSON.stringify(newFavoritesList));
    }
  };

  render() {
    const { data } = this.state;
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
              {this.state.favoritePhotos[data.id] ? (
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

export default Photo;
