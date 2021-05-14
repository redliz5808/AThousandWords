import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { FaEye } from "react-icons/fa";
import { ImCloudDownload } from "react-icons/im";
import { retrieveStats } from "store/userStats/userStatsActions";
import { StyledDiv } from "./userStats.styles";

class UserStats extends React.Component {
  loadingBar = React.createRef();

  componentDidMount() {
    this.props.retrieveStats(this.props.username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.props.userStats;
    if (prevProps.userStats.isLoading !== isLoading && isLoading) {
      this.loadingBar.current.continuousStart();
    }
    if (prevProps.userStats.isLoading !== isLoading && !isLoading) {
      this.loadingBar.current.complete();
    }
  }

  render() {
    const { stats } = this.props.userStats;
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
          <>
            <StyledDiv>
              <ImCloudDownload /> {convertedNumbers(stats.downloads.total)}
            </StyledDiv>
            <StyledDiv>
              <FaEye /> {convertedNumbers(stats.views.total)}
            </StyledDiv>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userStats: state.userStats,
});

const mapDispatchToProps = {
  retrieveStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
