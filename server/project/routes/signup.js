const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "mysqltest"
})

router.get('/', function(req, res, next) { /*'aaa' 넣으면 주소에 aaa 하면 위 창 실행 */
  client.query("SELECT * FROM login;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.render('login/signup', { /*''안에 있는(view폴더 안) ejs 파일 실행 */
        results: result
      });
    }
  });
});

router.post('/', function(req, res, next) {

  console.log("회원가입 성공")
  var body = req.body;

  client.query("INSERT INTO login (id,password, name) VALUES (?, ?, ?)",
   [body.id, body.password, body.name], function(){
    res.redirect("/login"); /* "aaa" 넣으면 주소가 aaa 페이지로 돌아감*/
  })
});

module.exports = router;
