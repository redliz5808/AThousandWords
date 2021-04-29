import React from "react";
import axios from "axios";

class UserStats extends React.Component {
  state = {
    stats: null,
  };

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`

  retrieveStats = async (username) => {
    try {
      const { data } = await axios(
        `${this.baseUrl}/${username}/statistics?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ stats: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveStats(this.props.username);
  }

  render() {
    const { stats } = this.state;

    const convertedNumbers = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
      <>
        {stats === undefined && <div>There are no stats for this user.</div>}
        {stats && stats !== undefined && (
          <div>
            <div>Downloads: {convertedNumbers(stats.downloads.total)}</div>
            <div>Views: {convertedNumbers(stats.views.total)}</div>
          </div>
        )}
      </>
    );
  }
}

export default UserStats;
