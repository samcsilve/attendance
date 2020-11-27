import {
  HOUR_LIST_REQUEST,
  HOUR_LIST_SUCCESS,
  HOUR_LIST_FAIL,
  HOUR_DETAILS_REQUEST,
  HOUR_DETAILS_SUCCESS,
  HOUR_DETAILS_FAIL,
  HOUR_CREATE_REQUEST,
  HOUR_CREATE_SUCCESS,
  HOUR_CREATE_FAIL,
  HOUR_CREATE_RESET,
  HOUR_DELETE_REQUEST,
  HOUR_DELETE_SUCCESS,
  HOUR_DELETE_FAIL,
  HOUR_DELETE_RESET,
} from "../constants/hourConstants";

export const hourListReducer = (state = { hours: [] }, action) => {
  switch (action.type) {
    case HOUR_LIST_REQUEST:
      return { loading: true };
    case HOUR_LIST_SUCCESS:
      return { loading: false, hours: action.payload };
    case HOUR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hourDetailsReducer = (
  state = { hour: { students: [] } },
  action
) => {
  switch (action.type) {
    case HOUR_DETAILS_REQUEST:
      return { loading: true };
    case HOUR_DETAILS_SUCCESS:
      return { loading: false, hour: action.payload };
    case HOUR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hourCreateReducer = (state = { hour: {} }, action) => {
  switch (action.type) {
    case HOUR_CREATE_REQUEST:
      return { loading: true };
    case HOUR_CREATE_SUCCESS:
      return { loading: false, hour: action.payload, success: true };
    case HOUR_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case HOUR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const hourDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUR_DELETE_REQUEST:
      return { loading: true };
    case HOUR_DELETE_SUCCESS:
      return { loading: false, hour: action.payload };
    case HOUR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case HOUR_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
