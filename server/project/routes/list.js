const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "mysqltest"
})

router.get('/',function (req,res,next) {
  res.redirect('/list/1')// /list로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
})

router.get('/:page', function (req,res,next){
  var page = req.params.page;
  var sql = "Select idx, title, writer, hit,  moddate from list;"
  client.query(sql, function (err, rows) {
      if (err) console.error("err : " + err);
               console.log('row : ' + rows);
      res.render('list', {title: 'list', rows: rows});
  });
});


 module.exports = router;
