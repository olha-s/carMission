import axios from "axios";
import { setLogoData, logoDataLoading } from "./actions";

export const loadLogoData = () => (dispatch) => {
    dispatch(logoDataLoading(true))
    axios("/api/logo")
        .then(res => {
        dispatch(setLogoData(...res.data))
        dispatch(logoDataLoading(false))
    })
}