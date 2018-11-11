const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const mysql = require('mysql')
const con = mysql.createConnection({
  host: '220.149.235.59',
  user:'sequence',
  password:'sw12345!!',
  database:'sequence_requirement'
})

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var server = app.listen(8090,function(){
  console.log('Express server has stated on port 8090');
});

// 최초 로그인 시 회원정보 데이터베이스에 등록하기
app.post('/api/member', (req, res) => {
  const data = JSON.parse(req.body.data)
  const chk = `select count(*) as cnt from member where email = ?`
  const sql = `INSERT INTO member SET id = ?, name = ?, email = ?`
  con.query(chk, [data.email], (err, result) => {
    if (err) console.log(err)
    if (result[0].cnt !== 0) {
      res.json({result: 'already inserted'})
    }
    con.query(sql, [data.id, data.name, data.email], err => {
      if (err) res.json({result: err})
      res.json({result: 'member inserted'})
    })
  })
})