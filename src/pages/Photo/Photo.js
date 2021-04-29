import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
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
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/photos`;

  retrievePhoto = async (photoid) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/${photoid}?client_id=${process.env.REACT_APP_API_KEY}`
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
    const mappedData = () => {
      if (data && data.tags === 1) return data.tags[0];
      if (data && data.tags[2] === undefined)
        return <span>There are no tags for this photo.</span>;
      if (data && data.tags[2] !== undefined) {
        const arr = Object.values(data.tags).map((tag) => {
          return tag.title;
        });
        const allButLast = arr.slice(0, arr.length - 1);
        const last = arr[arr.length - 1];
        return allButLast.join(", ").concat(", and ", last);
      }
    };
    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {this.state.data && (
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
        )}
      </>
    );
  }
}

export default Photo;
