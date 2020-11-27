import {
  ATTENDANCE_UPDATE_REQUEST,
  ATTENDANCE_UPDATE_SUCCESS,
  ATTENDANCE_UPDATE_FAIL,
} from "../constants/attendanceConstants";

export const updateAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_UPDATE_REQUEST:
      return { loading: true };
    case ATTENDANCE_UPDATE_SUCCESS:
      return { loading: false, attendance: action.payload, success: true };
    case ATTENDANCE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
