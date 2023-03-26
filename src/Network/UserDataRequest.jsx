import axios from 'axios'
export const UserDataRequest = async () => {
    let resp = await axios.get(`${process.env.REACT_APP_RANDOM_USER_URL}?results=10`)
    return resp.data
}