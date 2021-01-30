import jwtDecode from "jwt-decode";
import { setIsAuth } from "./actions";
import axios from "axios";

export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      axios.defaults.headers.common.Authorization = token;
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  }
};
