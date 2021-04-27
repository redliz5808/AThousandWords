import React from "react";
import axios from "axios";
import { Likes, Views } from "components";
import {
  MainImage,
  Container,
  UserInfo,
  UserImage,
  StyledDiv,
  TagsTitle,
  Tags,
} from "./photo.styles";

class Photo extends React.Component {
  state = {
    data: null,
  };

  retrievePhoto = async (photoid) => {
    try {
      const { data } = await axios(
        `https://api.unsplash.com/photos/${photoid}?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data });
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
    console.log(data);
    const mappedData =
      data &&
      this.state.data.tags.map((tag) => {
        return `${tag.title}, `;
      });
    return (
      this.state.data && (
        <Container>
          <UserInfo>
            <UserImage
              src={data.user.profile_image.medium}
              alt="user profile"
            />
            <h4>{data.user.name}</h4>
          </UserInfo>
          <MainImage src={data.urls.regular} alt={data.alt_description} />
          <StyledDiv>
            <Likes likes={data.likes} />
            <Views views={data.views} />
          </StyledDiv>
          <TagsTitle>Tags:</TagsTitle>
          <Tags>{mappedData}</Tags>
        </Container>
      )
    );
  }
}

export default Photo;
