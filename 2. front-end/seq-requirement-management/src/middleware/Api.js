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
  putViewDate () { throw `don't putViewDate impolemented` }
  getCommentList () { throw `don't getCommentList impolemented` }
  getComment () { throw `don't getComment impolemented` }
  putComment () { throw `don't putComment impolemented` }
  postComment () { throw `don't postComment impolemented` }
  postCommentReply () { throw `don't postCommentReply impolemented` }
  deleteComment () { throw `don't deleteComment impolemented` }
}
const baseURL = 'http://localhost:8090/api'
const RestApi = class extends Api {
  constructor () { super() }
  postMember (params) { return axios.post(`${baseURL}/member`, params) }
  getMember () { }
  postProject (params) { return axios.post(`${baseURL}/project`, params) }
  getProjectListOfMain (id) { return axios.get(`${baseURL}/projects/${id}`) }
  getProject (pidx) { return axios.get(`${baseURL}/project/${pidx}`) }
  postTask (params) { return axios.post(`${baseURL}/task`, params) }
  getTaskList (pidx) { return axios.get(`${baseURL}/tasks/${pidx}`) }
  getTask (tidx) { return axios.get(`${baseURL}/task/${tidx}`) }
  putTask (params) { return axios.put(`${baseURL}/task/${tidx}`, params) }
  putTaskState (params) {
    const type = ['process', 'complete', 'error']
    let putStateURL = `${baseURL}/task/${type[params.state]}`
    return axios.put(`${putStateURL}/${params.tidx}`)
  }
  deleteTask (tidx) { return axios.delete(`${baseURL}/task/${tidx}`) }
  putStar() { throw `don't putStar impolemented` }
  putViewDate() { throw `don't putViewDate impolemented` }
  getCommentList (tidx) { return axios.get(`${baseURL}/comments/${tidx}`) }
  getComment (cidx) { return axios.get(`${baseURL}/comment/${cidx}`) }
  postComment (params) { return axios.post(`${baseURL}/comment/${params.tidx}`, params) }
  postCommentReply (params) { return axios.post(`${baseURL}/comment/reply`, params) }
  putComment (params) { return axios.put(`${baseURL}/comment`, params) }
  deleteComment (cidx) { return axios.delete(`${baseURL}/comment/${cidx}`) }
}

const api = new RestApi()

export default api;