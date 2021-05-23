import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { ResponsiveMasonry } from "react-responsive-masonry";
import Masonry from "react-responsive-masonry";
import { ColumnBreaks } from "utils";
import {
  retrieveCollectionPhotos,
  fetchData,
} from "store/collectionPhoto/collectionPhotoActions";
import {
  StyledParagraph,
  StyledLink,
  StyledImage,
} from "./collectionPhotos.styles";

class CollectionPhotos extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    const { collectionid } = this.props;
    const { page } = this.state;
    this.props.retrieveCollectionPhotos(collectionid, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevState.page !== page) {
      const { collectionid } = this.props;
      this.props.fetchData(collectionid, page);
    }
  }

  updatePageNumber = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { data } = this.props.collectionPhoto;

    return (
      <>
        {data.length && (
          <>
            <InfiniteScroll
              dataLength={data.length}
              next={this.updatePageNumber}
              hasMore={true}
              loader={<h4>Loading more photos...</h4>}
              endMessage={
                <StyledParagraph>
                  There are no more photos to laod.
                </StyledParagraph>
              }
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={ColumnBreaks}
                gutter="0"
              >
                <Masonry>
                  {data.map((photo) => {
                    return (
                      <StyledLink to={`/photo/${photo.id}`} key={photo.id}>
                        <StyledImage
                          src={photo.urls.small}
                          alt={photo.alt_description}
                        />
                      </StyledLink>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </InfiniteScroll>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  collectionPhoto: state.collectionPhoto,
});

const mapDispatchToProps = {
  retrieveCollectionPhotos,
  fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPhotos);
