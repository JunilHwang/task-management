import Model from './Model.js'
import axios from 'axios'

const Api = class {
  constructor () {}
  postMember () { throw `don't postMember impolemented` }
  getMember () { throw `don't getMember impolemented` }
  putMemberInfo () { throw `don't putMemberInfo impolemented` }
  putMemberPassword () { throw `don't putMemberPassword impolemented` }
  liveCheck () { throw `don't liveCheck impolemented` }
  searchMember () { throw `don't searchMember impolemented` }
  postProject () { throw `don't postProject impolemented` }
  getProjectListOfMain () { throw `don't getProjectListOfMain impolemented` }
  getProject () { throw `don't getProject impolemented` }
  getProjectByIdx () { throw `don't getProjectByIdx impolemented` }
  postMemberInProject () { throw `don't postMemberInProject impolemented` }
  getMemberInProject () { throw `don't getMemberInProject impolemented` }
  putMemberInProject () { throw `don't putMemberInProject impolemented` }
  deleteMemberInProject () { throw `don't deleteMemberInProject impolemented` }
  getCategoryList () { throw `don't getCategoryList impolemented` }
  getCategory () { throw `don't getCategory impolemented` }
  postCategory () { throw `don't postCategory impolemented` }
  putCategory () { throw `don't putCategory impolemented` }
  deleteCategory () { throw `don't deleteCategory impolemented` }
  postCard () { throw `don't postCard impolemented` }
  getCardList () { throw `don't getCardList impolemented` }
  getCard () { throw `don't getCard impolemented` }
  putCard () { throw `don't putCard impolemented` }
  deleteCard () { throw `don't deleteCard impolemented` }
  putStar() { throw `don't putStar impolemented` }
  putViewDate() { throw `don't putViewDate impolemented` }
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
  postProject (data) {
    const date = +new Date
    const sql = `INSERT INTO project (writer, subject, description, uri, star, date) values (?, ?, ?, ?, ?, ${date})`
    const arr = [data.writer, data.subject, data.description, data.uri, 0]
    return Model.query(sql, arr).then(res => {
      return this.postMemberInProject(res.insertId, data.client, data.team)
    })
  }
  putProject (data) {
    const sql = `UPDATE project SET subject = ?, description = ?, uri = ? where idx = ?`
    const arr = [data.subject, data.description, data.uri, data.idx]
    return Model.query(sql, arr)
  }
  getProjectListOfMain (midx) {
    return Model.query(`SELECT * FROM project where idx in (SELECT pidx FROM member_in_project where midx = '${midx}')`)
  }
  getProject (id, uri) {
    return Model.query(`SELECT * FROM project where writer = '${id}' and uri = '${uri}'`)
  }
  getProjectByIdx (idx) {
    return Model.query(`SELECT * FROM project where idx = '${idx}'`)
  }
  postMemberInProject (pidx, client, team) {
    const sql = `INSERT INTO member_in_project (pidx, midx, type) values`
    let arr = []
    for (const midx of client) {
      arr.push(`(${pidx}, ${midx}, 1)`)
    }
    for (const midx of team) {
      arr.push(`(${pidx}, ${midx}, 2)`)
    }
    const append = arr.join(',')+';'
    return Model.query(sql+append)
  }
  getMemberInProject (pidx) {
    return Model.query(`
      SELECT  m.idx, m.name, m.id, mp.type
      FROM    member_in_project mp
      JOIN    member m on mp.midx = m.idx
      WHERE   mp.pidx = ${pidx}
      `)
  }
  putMemberInProject (data) {
    return this.deleteMemberInProject(data.pidx).then(() => this.postMemberInProject(data.pidx, data.client, data.team))
  }
  deleteMemberInProject (pidx) {
    return Model.query(`DELETE FROM member_in_project where pidx = '${pidx}'`)
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
      ca.title as category_name,
      mc2.members as members
      FROM    card c left
      join    (
      SELECT  mc.cidx, group_concat(m.name) as members
      from    member_in_card mc
      JOIN    member m on mc.midx = m.idx
      group by mc.cidx
      ) mc2 on mc2.cidx = c.idx
      join    member m on c.writer = m.idx
      join    c_category ca on c.category = ca.idx
      where   c.pidx='${pidx}'${append}
      order   by c.reg_date desc
      `)
  }
  getCard (idx) {
    return Model.query(`
      SELECT  c.*,
      m.name as writer_name,
      ca.title as category_name,
      mc2.members as members,
      p.uri as project_uri, p.writer as project_writer
      FROM    card c left
      join    (
      SELECT  mc.cidx, group_concat(m.name) as members
      from    member_in_card mc
      JOIN    member m on mc.midx = m.idx
      group by mc.cidx
      ) mc2 on mc2.cidx = c.idx
      join    member m on c.writer = m.idx
      join    c_category ca on c.category = ca.idx
      join    project p on c.pidx = p.idx
      where   c.idx='${idx}'
      order   by c.reg_date desc
      `)
  }
  putCard (data) {
    const sql = `UPDATE card SET category = ?, writer = ?, title = ?, content = ?, reg_date = ?, com_date = ?, state = ? where idx = ?`
    const arr = [data.category, data.writer, data.title, data.content, data.reg_date, data.com_date, data.state, data.idx]
    return Model.query(sql, arr)
  }
  deleteCard (idx) {
    return Model.query(`DELETE FROM card where idx = '${idx}'`)
  }
  putStar(data) {
    const sql = `UPDATE project SET star = ? where idx = ?`
    const arr = [data.star, data.idx]
    return Model.query(sql, arr)
  }
  putViewDate(idx) {
    const date = +new Date
    const sql = `UPDATE project SET viewDate = ${date} where idx = ?`
    const arr = [idx]
    return Model.query(sql, arr)
  }

}

const baseURL = 'http://127.0.0.1:8090'
const RestApi = class extends Api {
  constructor () { super() }
  postMember (data) {
    return axios.post(`${baseURL}/api/member`, {data: JSON.stringify(data)})
  }
  getMember () { }
  putMemberInfo () { }
  putMemberPassword () { }
  liveCheck () { }
  searchMember () { }
  postProject (data) {
    return axios.post(`${baseURL}/api/project`, {data: JSON.stringify(data)})
  }
  getProjectListOfMain () {
    //return Model.query(`SELECT * FROM project where idx in (SELECT pidx FROM member_in_project where midx = '${midx}')`)
  }
  getProject () { }
  getProjectByIdx () { }
  postMemberInProject () { }
  getMemberInProject () { }
  putMemberInProject () { }
  deleteMemberInProject () { }
  getCategoryList () { }
  getCategory () { }
  postCategory () { }
  putCategory () { }
  deleteCategory () { }
  postCard () { }
  getCardList () { }
  getCard () { }
  putCard () { }
  deleteCard () { }
  putStar() { }
  putViewDate() { }
}

const api = new RestApi()

export default api;