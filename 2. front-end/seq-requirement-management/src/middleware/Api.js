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
const baseURL = 'http://localhost:8090/api'
const RestApi = class extends Api {
  constructor () { super() }
  postMember (data) {
    return axios.post(`${baseURL}/member`, data)
  }
  getMember () { }
  postProject (data) {
    return axios.post(`${baseURL}/project`, data)
  }
  getProjectListOfMain (id) {
    return axios.get(`${baseURL}/projects/${id}`)
  }
  getProject (pidx) {
    return axios.get(`${baseURL}/project/${pidx}`)
  }
  postTask (data) {
    return axios.post(`${baseURL}/task`, data)
  }
  getTaskList (pidx) {
    return axios.get(`${baseURL}/tasks/${pidx}`)
  }
  getTask (tidx) {
    return axios.get(`${baseURL}/task/${tidx}`)
  }
  putTask () { throw `don't putTask impolemented` }
  putTaskState (data) {
    let putStateURL = `${baseURL}/task/`
    switch (data.state) {
      case 0 : putStateURL += 'process'; break
      case 1 : putStateURL += 'complete'; break
      case 2 : putStateURL += 'error'; break
    }
    return axios.put(`${putStateURL}/${data.tidx}`)
  }
  deleteTask (tidx) {
    return axios.delete(`${baseURL}/task/${tidx}`)
  }
  putStar() { throw `don't putStar impolemented` }
  putViewDate() { throw `don't putViewDate impolemented` }
}

const api = new RestApi()

export default api;