import React from "react";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";
import { Icon } from "components";
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
    const mappedData = () => {
      if(data && data.tags === 1) return data.tags[0];
      if(data) {
        const arr = Object.values(data.tags).map(tag => {return tag.title})
        const allButLast = arr.slice(0, arr.length - 1);
        const last = arr[arr.length - 1];
        return allButLast.join(", ").concat(", and ", last);
      }
    }
    return (
      this.state.data && (
        <Container>
          <UserInfo>
            <UserImage
              src={data.user.profile_image.medium}
              alt={data.user.username}
            />
            <h4>{data.user.name}</h4>
          </UserInfo>
          <MainImage src={data.urls.regular} alt={data.alt_description} />
          <StyledDiv>
            <Icon icon={<FaHeart />} stats={data.likes} />
            <Icon icon={<FaEye />} stats={data.views} />
          </StyledDiv>
          <TagsTitle>Tags:</TagsTitle>
          <Tags>{mappedData()}</Tags>
        </Container>
      )
    );
  }
}

export default Photo;
