import axios from "axios";
import { getFavoriteUsers } from "./userReducer";
import {
  FETCH_USER_DATA_PENDING,
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_SUCCESS,
  SET_USERNAME,
  SET_FAVORITE_USERS,
  USER_CLEAN_UP,
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
      payload: error,
    });
  }
};

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};

export const setUserAsFavorite = (id) => (dispatch, getState) => {
  const state = getState();
  const favoriteUsers = getFavoriteUsers(state);
  if (favoriteUsers[id]) {
    delete favoriteUsers[id];
    dispatch({
      type: SET_FAVORITE_USERS,
      payload: favoriteUsers,
    });
  } else {
    const newFavoritesList = { ...favoriteUsers, [id]: id };
    dispatch({
      type: SET_FAVORITE_USERS,
      payload: newFavoritesList,
    });
  }
};

export const userCleanup = () => ({
  type: USER_CLEAN_UP,
})
