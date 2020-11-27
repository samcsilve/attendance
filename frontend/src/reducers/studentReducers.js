import {
  STUDENT_CREATE_REQUEST,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
  STUDENT_CREATE_RESET,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
} from "../constants/studentConstants";

export const studentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_CREATE_REQUEST:
      return { loading: true };
    case STUDENT_CREATE_SUCCESS:
      return { loading: false, student: action.payload, success: true };
    case STUDENT_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case STUDENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const studentDetailsReducer = (state = { student: {attendance: []} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload, success: true };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
