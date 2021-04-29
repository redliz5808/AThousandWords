import React from "react";
import axios from "axios";
import { StyledImage } from "./photos.styles";

class Photos extends React.Component {
  state = {
    photos: null,
  };

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

  retrieveUserPhotos = async (username) => {
    try {
      const { data } = await axios(
        `${this.baseUrl}/${username}/photos?per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ photos: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveUserPhotos(this.props.username);
  }

  render() {
    const { photos } = this.state;

    return (
      <>
        {photos && photos.length === 0 && <div>This user has no photos</div>}
        {photos && photos.length > 0 && (
          <div>
            {photos.map((photo) => {
              return (
                <StyledImage
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.id}
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default Photos;
