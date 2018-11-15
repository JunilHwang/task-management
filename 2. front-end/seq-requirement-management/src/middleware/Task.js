import Vue from 'vue'
import Api from './Api.js'

const Task = class {

  static init (vue) {
    Task.instance = vue
  }

  static async getList (pidx) {
    const vue = Task.instance
    const data = await vue.getApiData(Api.getTaskList(pidx || vue.$route.params.pidx))
    vue.$store.commit('setState', ['taskList', data.list])
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
    const tidx = vue.$route.params.tidx
    const data = await vue.getApiData(Api.putTaskState({state, tidx}))
    Task.getOne()
  }
  
  static async getOne () {
    const vue = Task.instance
    const tidx = vue.$route.params.tidx
    const data = await vue.getApiData(Api.getTask(tidx))
    vue.$store.commit('setState', ['nowTask', data.task])
  }
  
  static async delete () {
    if (!confirm('정말로 삭제하시겠습니까?')) return
    const vue = Task.instance
    const data = await vue.getApiData(Api.deleteTask(vue.task.tidx))
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
  }
}

export default Task