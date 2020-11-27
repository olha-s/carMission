import axios from 'axios';
import { setLogoData } from './actions';


export const loadLogoData = () => (dispatch) => {
    axios('/api/logo')
        .then(res => {
        dispatch(setLogoData(res.data))
    })
}