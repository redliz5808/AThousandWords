import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { SearchPhotos, SearchCollections, SearchUsers } from "components";
import { StyledDiv, StyledSpan } from "./search.styles";

class Search extends React.Component {
  state = {
    value: 0,
    searchTerm: "",
  };

  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    this.setState({ searchTerm });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.props.match.params;
    if (prevProps.match.params.searchTerm !== searchTerm) {
      this.setState({ searchTerm });
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { searchTerm, value } = this.state;
    const isPhotos = value === 0;
    const isCollections = value === 1;
    const isUsers = value === 2;
    return (
      <>
        <StyledDiv>
          Search Results for <StyledSpan>{searchTerm}</StyledSpan>
        </StyledDiv>
        <Paper square>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Photos" />
            <Tab label="Collections" />
            <Tab label="Users" />
          </Tabs>
          {isPhotos && <SearchPhotos searchTerm={searchTerm} />}
          {isCollections && <SearchCollections searchTerm={searchTerm} />}
          {isUsers && <SearchUsers searchTerm={searchTerm} />}
        </Paper>
      </>
    );
  }
}

export default Search;
