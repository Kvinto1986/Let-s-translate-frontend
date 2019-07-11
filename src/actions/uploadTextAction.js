import axios from 'axios';
import server from '../serverConfig'

export const uploadOriginText = (text, email) => dispatch => {
    console.log(text)
    axios.post(`${server}api/uploads/uploadOriginText`, text, {
        headers: {
            'email': email
        }
    })
};