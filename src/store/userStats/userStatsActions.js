import axios from "axios";
import {
  GET_USER_STATS_PENDING,
  GET_USER_STATS_SUCCESS,
  GET_USER_STATS_ERROR,
} from "./userStatsTypes";

export const retrieveStats = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_STATS_PENDING,
    });
    const { data } = await axios(
      `${process.env.REACT_APP_API_BASE_URL}/users/${username}/statistics?client_id=${process.env.REACT_APP_API_KEY}`
    );
    dispatch({
      type: GET_USER_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_STATS_ERROR,
    });
  }
};
