import React from "react";
import { connect } from "react-redux";
import { FaRegStar, FaStar, FaHeart } from "react-icons/fa";
import { Icon, NextArrow, PrevArrow } from "components";
import { closeButton, heartOutline } from "assets";
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
  CloseButtonImg,
  StyledSlider,
  StyledImageLink,
  ImageDiv,
  SliderContainer,
  ImageBackgroundDiv,
  HeartIcon,
} from "./imageModal.styles";

class ImageModal extends React.Component {
  render() {
    const { showModal, data } = this.props.home;
    const { photo } = this.props;
    const readyToLoad = showModal && data.length > 0;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: this.props.home.index,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <>
        {readyToLoad && (
          <ModalMainContainer>
            <ModalSubContainer>
              <CloseButton onClick={this.props.handleModalClose}>
                <CloseButtonImg src={closeButton} alt="close button" />
              </CloseButton>
              <ModalImageContainer>
                <StyledSlider {...settings}>
                  {data.map((item) => {
                    return (
                      <div key={item.id}>
                        <SliderContainer>
                          <ModalUserContainer>
                            <StyledLink to={`/user/${item.user.username}`}>
                              <UserImage
                                src={item.user.profile_image.small}
                                alt={item.user.name}
                              />
                              <Username>{item.user.name}</Username>
                            </StyledLink>
                          </ModalUserContainer>
                          <ImageDiv backgroundColor={item.color}>
                            <ImageBackgroundDiv>
                              <StyledImageLink to={`/photo/${item.id}`}>
                                <StyledImage
                                  src={item.urls.regular}
                                  alt={item.alt_description}
                                />
                              </StyledImageLink>
                            </ImageBackgroundDiv>
                          </ImageDiv>
                          <ModalStatsContainer>
                              <HeartIcon src={heartOutline} alt="heart" />
                            <StyledDiv>
                              <Icon
                                stats={item.likes}
                                color="#FF4557"
                                type="heart"
                              />
                              {photo.favoritePhotos[item.id] ? (
                                <Icon
                                  icon={<FaStar />}
                                  handleClick={() =>
                                    this.props.setFavoriteImage(item.id)
                                  }
                                  stats=""
                                  color="#F6CF58"
                                  type="star"
                                />
                              ) : (
                                <Icon
                                  icon={<FaRegStar />}
                                  handleClick={() =>
                                    this.props.setFavoriteImage(item.id)
                                  }
                                  stats=""
                                  color="#8c8c8c"
                                  type="star"
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
