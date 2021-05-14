import axios from "axios";
import {
  GET_USER_DATA_PENDING,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./searchUsersTypes";

export const getUserData = (searchTerm) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_DATA_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/search/users?query=${searchTerm}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_USER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_ERROR,
    });
  }
};
