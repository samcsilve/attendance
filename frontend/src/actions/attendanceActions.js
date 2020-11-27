import axios from "axios";
import {
  ATTENDANCE_UPDATE_REQUEST,
  ATTENDANCE_UPDATE_SUCCESS,
  ATTENDANCE_UPDATE_FAIL,
} from "../constants/attendanceConstants";

export const attendanceUpdate = (status, record) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ATTENDANCE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const body = {status};
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/attendance/${record._id}`, body, config);

    dispatch({
      type: ATTENDANCE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
