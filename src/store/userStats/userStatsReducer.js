import {
  GET_USER_STATS_PENDING,
  GET_USER_STATS_SUCCESS,
  GET_USER_STATS_ERROR,
} from "./userStatsTypes";

const initialState = {
  stats: null,
  isLoading: false,
  error: false,
};

function userStatsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_STATS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload,
      };
    case GET_USER_STATS_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default userStatsReducer;
