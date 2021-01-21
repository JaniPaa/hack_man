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

const update = (username, newObject) => {
    return axios.put(basicUrl + 'update/' + username, newObject)
}

export default {
    getAll,
    create,
    getOne,
    update
}