import Model from './Model.js'
import axios from 'axios'

const Api = class {
  constructor () {}
  postMember () { throw `don't postMember impolemented` }
  getMember () { throw `don't getMember impolemented` }
  postProject () { throw `don't postProject impolemented` }
  getProjectListOfMain () { throw `don't getProjectListOfMain impolemented` }
  getProject () { throw `don't getProject impolemented` }
  postTask () { throw `don't postTask impolemented` }
  getTaskList () { throw `don't getTaskList impolemented` }
  getTask () { throw `don't getTask impolemented` }
  putTask () { throw `don't putTask impolemented` }
  deleteTask () { throw `don't deleteTask impolemented` }
  putStar() { throw `don't putStar impolemented` }
  putViewDate() { throw `don't putViewDate impolemented` }
}
const baseURL = 'http://localhost:8090'
const RestApi = class extends Api {
  constructor () { super() }
  postMember (data) {
    return axios.post(`${baseURL}/api/member`, data)
  }
  getMember () { }
  postProject (data) {
    return axios.post(`${baseURL}/api/project`, data)
  }
  getProjectListOfMain (id) {
    return axios.get(`${baseURL}/api/projects/${id}`)
  }
  getProject (pidx) {
    return axios.get(`${baseURL}/api/project/${pidx}`)
  }
  postTask (data) {
    return axios.post(`${baseURL}/api/task`, data)
  }
  getTaskList (pidx) {
    return axios.get(`${baseURL}/api/tasks/${pidx}`)
  }
  getTask () { throw `don't getTask impolemented` }
  putTask () { throw `don't putTask impolemented` }
  deleteTask () { throw `don't deleteTask impolemented` }
  putStar() { throw `don't putStar impolemented` }
  putViewDate() { throw `don't putViewDate impolemented` }
}

const api = new RestApi()

export default api;