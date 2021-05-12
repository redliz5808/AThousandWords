import axios from "axios";
import {
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_SUCCESS,
  SET_USERNAME,
  SET_FAVORITE_USERS,
} from "./userTypes";

export const retrieveUserData = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_DATA_ERROR,
    });
  }
};

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};

export const setFavoriteUsers = () => {
  return {
    type: SET_FAVORITE_USERS,
    payload: JSON.parse(localStorage.getItem("favoriteUsers")) || {},
  };
};

export const setUserAsFavorite = (id) => (dispatch, getState) => {
  const state = getState();
  if (state.user.favoriteUsers[id]) {
    const favoritesList = JSON.parse(localStorage.getItem("favoriteUsers"));
    delete favoritesList[id];
    dispatch({
      type: SET_FAVORITE_USERS,
      payload: favoritesList,
    });
    localStorage.setItem("favoriteUsers", JSON.stringify(favoritesList));
  } else {
    const favoritesList = JSON.parse(localStorage.getItem("favoriteUsers"));
    const newFavoritesList = { ...favoritesList, [id]: id };
    dispatch({
      type: SET_FAVORITE_USERS,
      payload: newFavoritesList,
    });
    localStorage.setItem("favoriteUsers", JSON.stringify(newFavoritesList));
  }
};
