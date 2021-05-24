import React from "react";
import { withRouter } from "react-router-dom";
import { StyledInput } from "./searchBar.styles";

class SearchBar extends React.Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.value}`);
    this.setState({ value: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledInput
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="Search"
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
