import axios from 'axios'

const baseURL = 'http://localhost:8090/api'
const RestApi = class {
  constructor () { }
  
  postMember (params) { return axios.post(`${baseURL}/member`, params) }
  getMember () { }
  
  postProject (params) { return axios.post(`${baseURL}/project`, params) }
  postProjectAccess (params) { return axios.post(`${baseURL}/project/access`, params) }
  getProjectListOfMain (id) { return axios.get(`${baseURL}/projects/${id}`) }
  getProject (pidx) { return axios.get(`${baseURL}/project/${pidx}`) }
  putProject (params) { return axios.put(`${baseURL}/project`, params) }

  postTask (params) { return axios.post(`${baseURL}/task`, params) }
  getTaskList (pidx) { return axios.get(`${baseURL}/tasks/${pidx}`) }
  getTask (tidx) { return axios.get(`${baseURL}/task/${tidx}`) }
  putTask (params) { return axios.put(`${baseURL}/task`, params) }
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
  
  getRepos (pidx) { return axios.get(`${baseURL}/github/repos/${pidx}`) }
  getCommits (tidx) { return axios.get(`${baseURL}/github/commit/${tidx}`)}
  postRepo (params) { return axios.post(`${baseURL}/github/repo`, params) }
  postTaskCommit (params) { return axios.post(`${baseURL}/github/match`, params)}
  deleteRepo (gridx) { return axios.delete(`${baseURL}/github/repo/${gridx}`) }
  deleteCommitOnTask (tidx, sha) { return axios.delete(`${baseURL}/github/match/${tidx}/${sha}`) }
}

export default new RestApi();