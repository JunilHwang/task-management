import Model from './Model.js'

const Api = class {
  constructor () {}
  postMember () { throw `don't postMember impolemented` }
  getMember () { throw `don't getMember impolemented` }
  putMemberInfo () { throw `don't getMember impolemented` }
  putMemberPassword () { throw `don't getMember impolemented` }
  liveCheck () { throw `don't getMember impolemented` }
  searchMember () { throw `don't getMember impolemented` }
  projectCreate () { throw `don't getMember impolemented` }
  getProjectListOfMain () { throw `don't getMember impolemented` }
  getProject () { throw `don't getMember impolemented` }
  getCategoryList () { throw `don't getMember impolemented` }
  getCategory () { throw `don't getMember impolemented` }
  postCategory () { throw `don't getMember impolemented` }
  putCategory () { throw `don't getMember impolemented` }
  deleteCategory () { throw `don't getMember impolemented` }
  postCard () { throw `don't getMember impolemented` }
  getCardList () { throw `don't getMember impolemented` }
  getCard () { throw `don't getMember impolemented` }
  putCard () { throw `don't getMember impolemented` }
  deleteCard () { throw `don't getMember impolemented` }
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
  liveCheck (val, name) {
    return Model.query(`SELECT * FROM member WHERE ${name} = ?`, [val])
  }
  projectCreate (data) {
    const date = +new Date
    const sql = `INSERT INTO project (writer, subject, description, uri, date) values (?, ?, ?, ?, ${date})`
    const arr = [data.writer, data.subject, data.description, data.uri]
    return Model.query(sql, arr).then(res => {
      const sql = `INSERT INTO member_in_project (pidx, midx, type) values`
      let arr = []
      for (const midx of data.client) {
        arr.push(`(${res.insertId}, ${midx}, 1)`)
      }
      for (const midx of data.team) {
        arr.push(`(${res.insertId}, ${midx}, 2)`)
      }
      const append = arr.join(',')+';'
      return Model.query(sql+append)
    })
  }
  getProjectListOfMain (midx) {
    return Model.query(`SELECT * FROM project where idx in (SELECT pidx FROM member_in_project where midx = '${midx}')`)
  }
  getProject (id, uri) {
    return Model.query(`SELECT * FROM project where writer = '${id}' and uri = '${uri}'`)
  }
  getCategoryList (idx) {
    return Model.query(`SELECT * FROM c_category where pidx = '${idx}' order by idx asc`)
  }
  getCategory (idx) {
    return Model.query(`SELECT * FROM c_category where idx = '${idx}'`)
  }
  postCategory (data) {
    return Model.query(`INSERT INTO c_category (pidx, title) values (?, ?)`, [data.idx, data.title])
  }
  putCategory (data) {
    return Model.query(`UPDATE c_category SET title = ? where idx = ?`, [data.title, data.idx])
  }
  deleteCategory (idx) {
    return Model.query(`DELETE FROM c_category where idx = ${idx}`)
  }
  postCard (data) {
    const sql = `
      INSERT INTO card (pidx, category, writer, title, content, reg_date, com_date, state)
      values (?, ?, ?, ?, ?, ?, ?, 0);
    `
    const arr = [data.pidx, data.category, data.writer, data.title, data.content, data.reg_date, data.com_date]
    return Model.query(sql, arr)
  }
  getCardList (pidx, category) {
    const append = category === -1 ? '' : ` and c.category='${category}'`
    return Model.query(`
      SELECT  c.*,
              m.name as writer_name,
              ca.title as category_name
      FROM    card c
      join    member m on c.writer = m.idx
      join    c_category ca on c.category = ca.idx
      where   c.pidx='${pidx}'${append}
      order   by c.reg_date desc
    `)
  }
  getCard (idx) {
    return Model.query(`SELECT * FROM card where idx='${idx}'`)
  }
  putCard (idx) {
    const sql = `UPDATE card SET category = ?, writer = ?, title = ?, content = ?, reg_date = ?, com_date = ?, state = ? where idx = ?`
    const arr = [category, writer, title, content, reg_date, com_date, state, idx]
    return Model.query(sql, arr)
  }
  deleteCard (idx) {
    return Model.query(`DELETE FROM card where idx = '${idx}'`)
  }
}
//const RestApi = class extends Api {}
const api = new TestApi()

export default api;