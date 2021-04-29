import React from "react";
import axios from "axios";

class Collections extends React.Component {
  state = {
    collections: null,
  };

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`

  retrieveCollections = async (username) => {
    try {
      const { data } = await axios(
        `${this.baseUrl}/${username}/collections?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ collections: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveCollections(this.props.username);
  }

  render() {
    const { collections } = this.state;
    return (
      <>
        {collections && collections.length === 0 && (
          <div>This user does not have any collections.</div>
        )}
        {collections && collections.length > 0 && (
          <div>Collections go here</div>
        )}
      </>
    );
  }
}

export default Collections;
