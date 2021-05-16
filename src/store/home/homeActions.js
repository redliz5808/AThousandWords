import axios from "axios";
import {
  GET_ALL_PHOTOS_SUCCESS,
  GET_ALL_PHOTOS_ERROR,
  GET_ALL_PHOTOS_PENDING,
  GET_PARSED_DATA,
  GET_FAVORITES_DATA,
  SET_PAGE_NUMBER,
  SET_FAVORITE_IMAGE,
  SHOW_MODAL,
  SET_DISPLAYED_IMAGE,
  GET_PHOTO_PENDING,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
} from "./homeTypes";

export const getAllPhotos = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PHOTOS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos?page=${page}&per_page=50&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_ALL_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PHOTOS_ERROR,
    });
  }
};

export const getParsed = (parsed) => {
  return {
    type: GET_PARSED_DATA,
    payload: parsed,
  };
};

export const getFavorites = () => {
  return {
    type: GET_FAVORITES_DATA,
    payload: JSON.parse(localStorage.getItem("favoritePhotos")) || {},
  };
};

export const setPage = (button) => (dispatch, getState) => {
  const state = getState();
  if (button === "Previous" && state.page === 1) {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: 1,
    });
  } else if (button === "Previous" && state.page > 1) {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: state.page - 1,
    });
  } else if (button === "Next") {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: state.page + 1,
    });
  } else {
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: Number(button),
    });
  }
};

export const setFavoriteImage = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.home.favoritePhotos[id]) {
    const favoritesList = state.home.favoritePhotos;
    delete favoritesList[id];
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: favoritesList,
    });
  } else {
    const newFavoritesList = { ...state.home.favoritePhotos, [id]: id };
    dispatch({
      type: SET_FAVORITE_IMAGE,
      payload: newFavoritesList,
    });
  }
};

export const handleImageClick = (id) => (dispatch, getState) => {
  // const state = getState();
  // dispatch({
  //   type: SHOW_MODAL,
  //   payload: !state.home.showModal,
  // });
  dispatch({
    type: SET_DISPLAYED_IMAGE,
    payload: id,
  });
};

export const displayPhoto = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PHOTO_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/photos/${id}?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PHOTO_ERROR,
    });
  }
};

export const handleModalClose = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SHOW_MODAL,
    payload: !state.home.showModal,
  });
};
