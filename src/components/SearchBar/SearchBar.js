import React from "react";
import { withRouter } from "react-router-dom";
import { searchIcon } from "assets";
import { StyledForm, StyledImage, StyledInput } from "./searchBar.styles";

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
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledImage src={searchIcon} alt="Search Icon" />
        <StyledInput
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="Search..."
        />
      </StyledForm>
    );
  }
}

export default withRouter(SearchBar);
