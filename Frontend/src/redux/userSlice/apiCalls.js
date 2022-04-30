import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import * as actions from "./index";


export const getUser = async (payload, dispatch) => {
  dispatch(actions.getUserStart());
  try {
    const { data } = await axiosInstance.get(
      `http://localhost:5000/api` + `/users/${payload}`
    );
    dispatch(actions.getUserSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getUserFailure());
    return false;
  }
};

export const updateUser = async (payload, dispatch) => {
  dispatch(actions.updateUserStart());
  try {
    const url = `http://localhost:5000/api` + `/users/${payload.id}`;
    const { data } = await axiosInstance.put(url, payload.data);
    dispatch(actions.updateUserSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.getUserFailure());
    return false;
  }
};

export const likeSong = async (payload, dispatch) => {
  dispatch(actions.likeSongStart());
  try {
    const { data } = await axiosInstance.put(
      `http://localhost:5000/api` + `/songs/like/${payload}`
    );
    dispatch(actions.likeSongSuccess(payload));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.likeSongFailure());
    return false;
  }
};
