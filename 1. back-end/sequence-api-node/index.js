// import dependency
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const mysql = require('mysql')

// variable setting
const con = mysql.createConnection({
  host: '220.149.235.59',
  user:'sequence',
  password:'sw12345!!',
  database:'sequence_requirement'
})

// app setting
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// run app
var server = app.listen(8090,function(){
  console.log('Express server has stated on port 8090');
});

/**
 * 회원등록 : 최초 로그인 시 회원 등록.
 */
app.post('/api/member', (req, res) => {
  const data = JSON.parse(req.body.data)
  const chk = `select count(*) as cnt from member where email = ?`
  const sql = `INSERT INTO member SET id = ?, name = ?, email = ?`
  con.query(chk, [data.email], (err, result) => {
    if (err) console.log(err)
    // 등록된 회원일 경우 종료
    if (result[0].cnt !== 0) {
      res.json({result: 'already inserted'})
      return
    }

    // 아닐 경우 회원등록
    con.query(sql, [data.id, data.name, data.email], err => {
      if (err) res.json({result: err})
      res.json({result: 'member inserted'})
    })
  })
})

/**
 * 프로젝트 생성 : 프로젝트와 프로젝트 접근 권한을 데이터베이스에 추가한다.
 */
app.post('/api/project', (req, res) => {
  const data = JSON.parse(req.body.data)
  const sql = 'INSERT INTO project SET `writer` = ?, `title` = ?, `description` = ?;'
  const prepare = [data.writer, data.title, data.description]
  con.query(sql, prepare, (err, result) => {
    let success = err ? {success: false, err: err} : {success: true}

    // 프로젝트 추가 후, 작성자의 프로젝트 접근권한을 등록한다.
    con.query('INSERT INTO project_access SET `pidx` = ?, `mid` = ?, `register_date` = now();', [result.insertId, data.writer], err => {
      success = err ? {success: false, err: err} : {success: true, lastid: result.insertId}
      res.json(success)
    })
  })
})

/**
 * 참여 중인 프로젝트 목록 가져오기
 */
app.get('/api/projects/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM project where writer in (SELECT mid FROM project_access where mid = '${id}')`
  con.query(sql, (err, result) => {
    let success = err ? {success: false, err: err} : {success: true, list: result}
    res.json(success)
  })
})

/**
 * pidx에 해당하는 프로젝트 가쳐오기
 */
app.get('/api/project/:pidx', (req, res) => {
  const pidx = req.params.pidx
  const sql = `SELECT * FROM project where pidx = '${pidx}'`
  con.query(sql, (err, result) => {
    let success = err ? {success: false, err: err} : {success: true, project: result[0]}
    res.json(success)
  })
})