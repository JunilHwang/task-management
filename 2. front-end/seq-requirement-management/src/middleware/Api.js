import axios from 'axios'

const baseURL = '/api'
const RestApi = class {
  constructor () { }
  
  postMember (params) { return axios.post(`${baseURL}/member`, params) }
  getMemberOnProject (pidx) { return axios.get(`${baseURL}/memberOnProject/${pidx}`) }
  putMemberGoogleToken (params) { return axios.put(`${baseURL}/member/google-token`, params) }
  
  getProjectList (mid) { return axios.get(`${baseURL}/projects/${mid}`) }
  getProject (pidx) { return axios.get(`${baseURL}/project/${pidx}`) }
  postProject (params) { return axios.post(`${baseURL}/project`, params) }
  postProjectAccess (params) { return axios.post(`${baseURL}/project/access`, params) }
  putProject (params) { return axios.put(`${baseURL}/project`, params) }
  putProjectStar(params) { return axios.put(`${baseURL}/project/star`, params)}
  deleteProject (pidx) { return axios.delete(`${baseURL}/project/${pidx}`) }

  getTask (tidx) { return axios.get(`${baseURL}/task/${tidx}`) }
  getTaskList (pidx) { return axios.get(`${baseURL}/tasks/${pidx}`) }
  getTaskListRecently (mid) { return axios.get(`${baseURL}/task/recently/${mid}`) }
  getTaskByRange (params) { return axios.get(`${baseURL}/task-range`, { params }) }
  postTask (params) { return axios.post(`${baseURL}/task`, params) }
  putTask (params) { return axios.put(`${baseURL}/task`, params) }
  putTaskState (params) {
    const type = ['process', 'complete', 'error']
    let putStateURL = `${baseURL}/task/${type[params.state]}`
    return axios.put(`${putStateURL}/${params.tidx}`)
  }

  getTaskMember (params) { return axios.get(`${baseURL}/task/member`, { params }) }
  postTaskMember (params) { return axios.post(`${baseURL}/task/member`, params) }
  deleteTaskMember (params) { return axios.delete(`${baseURL}/task/member`, { params }) }

  getTaskOnCalendar (params) { return axios.get(`${baseURL}/task-on-calendar`, {params}) }
  postTaskOnCalendar (params) { return axios.post(`${baseURL}/task-on-calendar`, params) }
  putTaskOnCalendar (params) { return axios.put(`${baseURL}/task-on-calendar`, {params}) }
  deleteTaskOnCalendar (id) { return axios.delete(`${baseURL}/task-on-calendar/${id}`) }

  deleteTask (tidx) { return axios.delete(`${baseURL}/task/${tidx}`) }
  
  putViewDate() { throw `don't putViewDate impolemented` }
  
  getCommentList (tidx) { return axios.get(`${baseURL}/comments/${tidx}`) }
  getCommentRecentlyList (mid) { return axios.get(`${baseURL}/comment/recently/${mid}`) }
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