import axios from 'axios'
const basicUrl = 'http://localhost:5000/users/'

const getAll = () => {
    return axios.get(basicUrl)
}

const create = newObject => {
    return axios.post(basicUrl + 'add', newObject)
}

const getOne = (username) => {
    return axios.get(basicUrl +""+ username)
}

export default {
    getAll,
    create,
    getOne
}