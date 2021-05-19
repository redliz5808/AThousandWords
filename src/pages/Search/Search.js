import React from "react";
import { SearchPhotos, SearchCollections, SearchUsers } from "components";
import {
  MainContainer,
  SubContainer,
  StyledDiv,
  StyledSpan,
  Tabs,
  Users,
  TabsSubContainer,
  UsersButton,
  PhotosButton,
  CollectionsButton,
} from "./search.styles";

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

  handleClick = (e) => {
    const { innerText } = e.target;
    if (innerText === "Photos") {
      this.setState({ value: 0 });
    } else if (innerText === "Collections") {
      this.setState({ value: 1 });
    } else if (innerText === "Users") {
      this.setState({ value: 2 });
    }
  };

  render() {
    const { searchTerm, value } = this.state;
    const showPhotos = value === 0;
    const showCollections = value === 1;
    const showUsers = value === 2;
    return (
      <MainContainer>
        <SubContainer>
          <StyledDiv>
            Search Results for <StyledSpan>{searchTerm}</StyledSpan>
          </StyledDiv>
          <Tabs>
            <Users>
              <UsersButton onClick={this.handleClick} value={value} >Users</UsersButton>
            </Users>
            <TabsSubContainer>
              <PhotosButton onClick={this.handleClick} value={value} >Photos</PhotosButton>
              <CollectionsButton onClick={this.handleClick} value={value} >
                Collections
              </CollectionsButton>
            </TabsSubContainer>
          </Tabs>
          {showPhotos && <SearchPhotos searchTerm={searchTerm} />}
          {showCollections && <SearchCollections searchTerm={searchTerm} />}
          {showUsers && <SearchUsers searchTerm={searchTerm} />}
        </SubContainer>
      </MainContainer>
    );
  }
}

export default Search;
