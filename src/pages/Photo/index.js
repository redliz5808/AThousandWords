import React from "react";
import axios from "axios";

class Photo extends React.Component {
  getPhoto = async (photoid) => {
    try {
      const { data } = await axios(
        `https://api.unsplash.com/photos/:${photoid}&client_id=${process.env.REACT_APP_API_KEY}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { photoid } = this.props.match.params;
    this.getPhoto(photoid);
  }

  render() {
    return <h1>Photo Page</h1>;
  }
}

export default Photo;
