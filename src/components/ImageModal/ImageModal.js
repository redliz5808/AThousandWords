import React from "react";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Icon } from "components";
import { displayPhoto, handleModalClose } from "store/home/homeActions";
import { setFavoriteImage } from "store/photo/photoActions";
import {
  ModalMainContainer,
  ModalSubContainer,
  ModalImageContainer,
  StyledImage,
  StyledDiv,
  ModalStatsContainer,
  StyledLink,
  ModalUserContainer,
  UserImage,
  Username,
  CloseButton,
  StyledSlider,
  StyledImageLink,
  ImageDiv,
  SliderContainer,
} from "./imageModal.styles";

class ImageModal extends React.Component {
  render() {
    const { showModal, data } = this.props.home;
    const { photo } = this.props;
    const readyToLoad = showModal && data.length;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: this.props.home.index,
    };

    return (
      <>
        {readyToLoad && (
          <ModalMainContainer>
            <ModalSubContainer>
              <CloseButton onClick={this.props.handleModalClose}>X</CloseButton>
              <ModalImageContainer>
                <StyledSlider {...settings}>
                  {data.map((item) => {
                    return (
                      <div>
                        <SliderContainer key={item.id}>
                          <ModalUserContainer>
                            <StyledLink to={`/user/${item.user.username}`}>
                              <UserImage
                                src={item.user.profile_image.small}
                                alt={item.user.name}
                              />
                              <Username>{item.user.name}</Username>
                            </StyledLink>
                          </ModalUserContainer>
                          <ImageDiv>
                            <StyledImageLink to={`/photo/${item.id}`}>
                              <StyledImage
                                src={item.urls.regular}
                                alt={item.alt_description}
                              />
                            </StyledImageLink>
                          </ImageDiv>
                          <ModalStatsContainer>
                            <StyledDiv>
                              {photo.favoritePhotos[item.id] ? (
                                <Icon
                                  id={item.id}
                                  icon={<FaHeart />}
                                  handleClick={() =>
                                    this.props.setFavoriteImage(item.id)
                                  }
                                  stats={item.likes}
                                  color="#9d0707"
                                  type="heart"
                                />
                              ) : (
                                <Icon
                                  id={item.id}
                                  icon={<FaHeart />}
                                  handleClick={() =>
                                    this.props.setFavoriteImage(item.id)
                                  }
                                  stats={item.likes}
                                  color="#8c8c8c"
                                  type="heart"
                                />
                              )}
                            </StyledDiv>
                          </ModalStatsContainer>
                        </SliderContainer>
                      </div>
                    );
                  })}
                </StyledSlider>
              </ModalImageContainer>
            </ModalSubContainer>
          </ModalMainContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
  photo: state.photo,
});

const mapDisptachToProps = {
  displayPhoto,
  setFavoriteImage,
  handleModalClose,
};

export default connect(mapStateToProps, mapDisptachToProps)(ImageModal);
