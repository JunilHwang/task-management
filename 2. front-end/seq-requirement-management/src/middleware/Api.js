import Model from './Model.js'

const Api = class {
  constructor () {}
  postMember () { throw `don't postMember impolemented` }
  getMember () { throw `don't getMember impolemented` }
  putMemberInfo () { throw `don't getMember impolemented` }
  putMemberPassword () { throw `don't getMember impolemented` }
  searchMember () { throw `don't getMember impolemented` }
  projectCreate () { throw `don't getMember impolemented` }
  getProjectListOfMain () { throw `don't getMember impolemented` }
}

const TestApi = class extends Api {
  constructor () { super() }
  postMember (data) {
    const arr = [data.id, data.pw, data.name, data.email, data.belong]
    const sql = `INSERT INTO member (id, pw, name, email, belong) values (?, ?, ?, ?, ?)`
    Model.query(`SELECT * FROM member where id = ? or email = ?`, [data.id, data.email]).then(chk => {
      if (chk.rows.length) {
        alert('중복된 아이디 혹은 이메일이 있습니다. 다시 입력해주세요.')
        return null
      } else {
        return Model.query(sql, arr).then(data.success)
      }
    })
  }
  getMember (id, pw) {
    const sql = `SELECT * FROM member WHERE (id = ? or email = ?) and pw = ?`
    const arr = [id, id, pw]
    return Model.query(sql, arr)
  }
  putMemberInfo (data) {
    const arr = [data.id, data.email, data.name, data.belong, data.idx]
    const sql = `UPDATE member SET id = ?, email = ?, name = ?, belong = ? where idx = ?`
    Model
    .query(`SELECT * FROM member where id = ? or email = ?`, [data.id, data.email])
    .then(chk => {
      if (chk.rows.length > 1) {
        alert('중복된 아이디 혹은 이메일이 있습니다. 다시 입력해주세요')
        return null
      } else {
        return Model.query(sql, arr).then(data.success)
      }
    })
  }
  putMemberPassword (data) {
    return Model.query(`UPDATE member SET pw = ? where idx = ?`, [data.pw, data.idx])
  }
  searchMember (key, not) {
    let add_sql = not.length ? `and idx not in (${not})` : ''
    const sql = `SELECT * FROM member where (id like ? or email like ?) ${add_sql} order by id asc`
    const arr = [`%${key}%`, `%${key}%`]
    return Model.query(sql, arr)
  }
  projectCreate (data) {
    const date = +new Date
    const sql = `INSERT INTO project (subject, description, uri, client, team, date) values (?, ?, ?, ?, ?, ${date})`
    const arr = [data.subject, data.description, data.uri, JSON.stringify(data.client), JSON.stringify(data.team)]
    return Model.query(sql, arr)
  }
  liveCheck (val, name) {
    return Model.query(`SELECT * FROM member WHERE ${name} = ?`, [val])
  }
  getProjectListOfMain () {
    return Model.query('SELECT * FROM project order by idx desc')
  }
}
//const RestApi = class extends Api {}
const api = new TestApi()

export default api;