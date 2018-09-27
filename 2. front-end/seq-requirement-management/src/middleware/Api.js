import Model from './Model.js'

const Api = class {
  constructor () {}
  postMember (data) { throw `don't postMember impolemented` }
  getMember (data) { throw `don't getMember impolemented` }
}

const TestApi = class extends Api {
  constructor () { return super()}
  postMember (data) {
    return new Promise (async resolve => {
      const arr = [data.id, data.pw, data.name, data.email, data.belong]
      const sql = `INSERT INTO member (id, pw, name, email, belong) values (?, ?, ?, ?, ?)`
      const chk = await Model.query(`SELECT * FROM member where id = ? or email = ?`, [data.id, data.email])
      if (chk.length) {
        alert('중복된 아이디가 있습니다. 다시 입력해주세요')
      } else {
        Model.query(sql, arr).then(resolve)
      }
    })
  }
  getMember (id, pw) {
    const sql = `SELECT * FROM member WHERE (id = ? or email = ?) and pw = ?`
    const arr = [id, id, pw]
    return new Promise (resolve => {
      Model.query(sql, arr).then(resolve)
    })
  }
}

const RestApi = class extends Api {

}

const api = new TestApi()

export default api;