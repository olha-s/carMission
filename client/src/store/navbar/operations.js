import axios from 'axios';
import { setNavbarData } from './actions';


export const loadNavbarData = () => (dispatch) => {
    axios('/api/navbar')
        .then(res => {
        dispatch(setNavbarData(res.data))
    })
}