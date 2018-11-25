import Api from './Api.js'

const Task = class {

  static init (vue) {
    Task.instance = vue
  }

  static async getList (pidx) {
    const vue = Task.instance
    const data = await vue.getApiData(Api.getTaskList(pidx || vue.$route.params.pidx))
    vue.$store.commit('setState', ['taskList', data.list])
    return data.list
  }

  static async create (e) {
    const vue = Task.instance
    const frm = e.target
    const title = frm.title.value,
          parent = frm.parent.value,
          start_date = `${frm.start.value} ${frm.start_h.value}:${frm.start_m.value}:00`,
          limit_date = `${frm.limit.value} ${frm.limit_h.value}:${frm.limit_m.value}:00`,
          description = frm.description.value,
          pidx = vue.$route.params.pidx
    const params = {pidx, parent, title, start_date, limit_date, description}
    await vue.getApiData(Api.postTask(params))
    const data = await vue.getApiData(Api.getTaskList(vue.$route.params.pidx))
    vue.$store.commit('setState', ['taskList', data.list])
    vue.$store.commit('closeLayer')
    alert('완료되었습니다.')
  }
  
  static async setState (state) {
    const vue = Task.instance
    const tidx = vue.$route.params.tidx || vue.task.tidx
    await vue.getApiData(Api.putTaskState({state, tidx}))
    Task.getOne()
  }
  
  static async getOne (parent = null) {
    const vue = Task.instance
    const tidx = parent || vue.$route.params.tidx
    const data = await vue.getApiData(Api.getTask(tidx))
    if (parent == null) vue.$store.commit('setState', ['nowTask', data.task])
    return data.task
  }

  static async getMember (tidx = null) {
    const vue = Task.instance
    const params = {
      tidx: tidx || vue.$store.state.nowTask.tidx,
      midx: vue.$store.state.member.midx
    }
    const data = await vue.getApiData(Api.getTaskMember(params))
    if (tidx === null) {
      vue.$store.commit('setState', ['taskMember', data.list])
    }
    return data.list
  }
  
  static async delete () {
    if (!confirm('정말로 삭제하시겠습니까?')) return
    const vue = Task.instance
    await vue.getApiData(Api.deleteTask(vue.task.tidx))
    vue.$router.push('/project/view/' + vue.task.pidx)
  }

  static async update (e) {
    const vue = Task.instance
    const frm = e.target
    const title = frm.title.value,
          start_date = `${frm.start.value} ${frm.start_h.value}:${frm.start_m.value}:00`,
          limit_date = `${frm.limit.value} ${frm.limit_h.value}:${frm.limit_m.value}:00`,
          description = frm.description.value,
          tidx = vue.tidx
    const params = {tidx, title, start_date, limit_date, description}
    await vue.getApiData(Api.putTask(params))
    alert('완료되었습니다.')
    vue.$store.commit('closeLayer')
    Task.getOne()
    if (vue.calendarConn !== null) {
      vue.updateCalendar(params)
    }
  }

  static async getCommits () {
    const vue = Task.instance
    const task = vue.task
    const tidx = task.tidx
    const parent = task.parent
    const resCommit = await vue.getApiData(Api.getCommits(tidx))
    vue.parent = task.parent ? await Task.getOne(parent) : null
    vue.commits = resCommit.commits
  }

  static async getOnCalendar () {
    const vue = Task.instance
    const tidx = vue.task.tidx
    const midx = vue.$store.state.member.midx
    const resConnected = await vue.getApiData(Api.getTaskOnCalendar({tidx, midx})) 
    vue.calendarConn = resConnected.data
  }
}

export default Task