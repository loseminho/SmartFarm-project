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
      res.render('login/login', { /*''안에 있는(view폴더 안) ejs 파일 실행 */
        results2: result
      });
    }
  });
});

router.post('/', function(req, res) {
  var loginID = req.body.id;
  var loginPW = req.body.password;
  var loginsql = 'SELECT * FROM login where id =?';
  var name = '';
  client.query(loginsql, loginID, function(err, rows, fields){

    if(err){
      console.log('err : ' + err);
    }
    else{
      console.log(rows);
      if(rows[0] != undefined){
        if (loginPW != rows[0].password){
        res.send('<script>alert("패스워드가 일치하지 않습니다."); location.href="/login";</script>')
        console.log('패스워드가 일치하지 않습니다.');
      }
      else{
        console.log('로그인 성공');
        res.redirect('/opening');
      }
    }
    else{
      console.log(rows[0]);
      res.send('<script>alert("해당 관리자가 없습니다."); location.href="/login";</script>')
      console.log('해당 유저가 없습니다.');
    }
  }
  })

});

//제작자페이지
router.get('/maker', function(req, res, next) { /*'aaa' 넣으면 주소에 aaa 하면 위 창 실행 */
  client.query("SELECT * FROM login;", function(err, result, fields){
    if(err){
      console.log("동작이 안되고 있습니다.");
    }
    else{
      res.render('login/maker', { /*''안에 있는(view폴더 안) ejs 파일 실행 */
        results2: result
      });
    }
  });
});

module.exports = router;
