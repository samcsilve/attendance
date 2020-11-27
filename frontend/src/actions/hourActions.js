import axios from "axios";
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

export const listHours = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUR_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/hours", config);

    dispatch({
      type: HOUR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOUR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHourDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUR_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/hours/${id}`, config);

    dispatch({
      type: HOUR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOUR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createHour = (hour, subject) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUR_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/hours/`, { hour, subject }, config);

    dispatch({
      type: HOUR_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: HOUR_CREATE_RESET,
    });
  } catch (error) {
    dispatch({
      type: HOUR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteHour = (id, history) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUR_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/hours/${id}`, config);

    dispatch({
      type: HOUR_DELETE_SUCCESS,
      payload: data,
    });
    history.push('/')

    dispatch({
      type: HOUR_DELETE_RESET,
    });
  } catch (error) {
    dispatch({
      type: HOUR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
