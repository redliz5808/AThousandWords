import React from "react";
// import Paper from "@material-ui/core/Paper";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
import { 
  FavoritePhoto, 
  // FavoriteCollection, 
  // FavoriteUser, 
} from "components";

class Favorites extends React.Component {
  // state = {
  //   value: 0,
  // };

  // handleChange = (event, newValue) => {
  //   this.setState({ value: newValue });
  // };

  render() {
    // const { value } = this.state;
    // const isPhotos = value === 0;
    // const isCollections = value === 1;
    // const isUsers = value === 2;
    return (
      <FavoritePhoto />
      // <Paper square>
      //   <Tabs
      //     value={value}
      //     textColor="primary"
      //     indicatorColor="primary"
      //     onChange={this.handleChange}
      //   >
      //     <Tab label="Photos" />
      //     <Tab label="Collections" />
      //     <Tab label="Users" />
      //   </Tabs>
      //   {isPhotos && <FavoritePhoto />}
      //   {isCollections && <FavoriteCollection />}
      //   {isUsers && <FavoriteUser />}
      // </Paper>
    );
  }
}

export default Favorites;
