import axios from 'axios'
const basicUrl = 'http://localhost:5000/stats/'

const getAll = () => {
    return axios.get(basicUrl)
}

const create = newObject => {
    return axios.post(basicUrl + 'add', newObject)
}

const getOne = (id) => {
    return axios.get(basicUrl +""+ id)
}

const update = (id, newObject) => {
    return axios.put(basicUrl + 'update/' + id, newObject)
}

export default {
    getAll,
    create,
    update,
    getOne
}