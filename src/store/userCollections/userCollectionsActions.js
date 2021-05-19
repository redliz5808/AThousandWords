import axios from "axios";
import {
  GET_USER_COLLECTIONS_PENDING,
  GET_USER_COLLECTIONS_SUCCESS,
  GET_USER_COLLECTIONS_ERROR,
} from "./userCollectionsTypes";

export const retrieveCollections = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_COLLECTIONS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}/collections?per_page=7&client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_USER_COLLECTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_COLLECTIONS_ERROR,
    });
  }
};
