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
  }

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
              <Icon icon={<FaHeart />} stats={data.likes} />
              <Icon icon={<FaEye />} stats={data.views} />
            </StyledDiv>
            <Tags>
              {tagsAvailable &&
                data.tags.map((tag, index) => {
                  if (index < 6) {
                    return (
                      <TagLink key={tag.title} to={`/search/${tag.title}`}>
                        {tag.title}
                      </TagLink>
                    );
                  }
                  return null;
                })}
            </Tags>
          </Container>
        )}
      </>
    );
  }
}

export default Photo;
