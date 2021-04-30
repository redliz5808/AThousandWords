import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { FaEye } from "react-icons/fa";
import { ImCloudDownload } from "react-icons/im";

class UserStats extends React.Component {
  state = {
    stats: null,
    isLoading: false,
  };

  loadingBar = React.createRef();

  baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

  retrieveStats = async (username) => {
    try {
      this.loadingBar.current.continuousStart();
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${this.baseUrl}/${username}/statistics?client_id=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ stats: data, isLoading: false });
      this.loadingBar.current.complete();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveStats(this.props.username);
  }

  render() {
    const { stats } = this.state;
    const readyWithoutUserStats = stats === undefined;
    const readyWithUserStats = stats && stats !== undefined;

    const convertedNumbers = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
      <>
        <LoadingBar color="#6958f2" ref={this.loadingBar} />
        {readyWithoutUserStats && <div>There are no stats for this user.</div>}
        {readyWithUserStats && (
          <div>
            <div>
              <ImCloudDownload /> {convertedNumbers(stats.downloads.total)}
            </div>
            <div>
              <FaEye /> {convertedNumbers(stats.views.total)}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default UserStats;
