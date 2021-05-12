import axios from "axios";
import {
  GET_FAVORITE_USER_PENDING,
  GET_FAVORITE_USER_SUCCESS,
  GET_FAVORITE_USER_ERROR,
} from "./favoriteUserTypes";

export const retrieveFavoriteUsers = (favoriteUsers) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_FAVORITE_USER_PENDING,
    });
    const users = await Promise.all(
      Object.values(favoriteUsers).map(async (user) => {
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/users/${user}?client_id=${process.env.REACT_APP_API_KEY}`
        );
        return data;
      })
    );
    dispatch({
      type: GET_FAVORITE_USER_SUCCESS,
      payload: users,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_USER_ERROR,
    });
  }
};
