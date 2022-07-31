/*** routes/users.js ***/
const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "mysqltest"
})



const users = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'npm' },
  { id: 3, name: 'Pengsu' },
]


router.get("/temp1", function(req, res, next){
  var loginsql = "SELECT id, sensor, data, date_format(TIME,'%Y-%m-%d %H:%i') as time from sensor1 ORDER BY time DESC LIMIT 1;";
  client.query(loginsql, function(err, rows,fields){
    if(err){
      console.log('err : '+ err );
    }
    else{
      res.json({minho:rows});
      console.log(rows);
    }
  });
});

router.get("/temp6", function(req, res, next){
  var loginsql = "SELECT id, sensor, data, date_format(TIME,'%Y-%m-%d %H:%i') as time from sensor1 ORDER BY time DESC LIMIT 6;";
  client.query(loginsql, function(err, rows,fields){
    if(err){
      console.log('err : '+ err );
    }
    else{
      res.json({minho:rows});
      console.log(rows);
    }
  });
});



router.post('/signup', function (req, res, next) {
  var body = req.body;

  client.query("INSERT INTO app (firstname, lastname, id, email, password) VALUES(?,?,?,?, ?)",[
     body.firstname, body.lastname,body.id, body.email,body.password], function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json({minho:rows});
      console.log(rows);
    }
}
)
});


router.get('/code', function (req, res, next) {
  client.query("SELECT * FROM app ORDER BY NB DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다1");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.get('/crt', function (req, res, next) {
  client.query("SELECT * FROM movecrt ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.get('/fan', function (req, res, next) {
  client.query("SELECT * FROM movefan ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.get('/water', function (req, res, next) {
  client.query("SELECT * FROM movewater ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.get('/lamp', function (req, res, next) {
  client.query("SELECT * FROM movelamp ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});


router.get('/move1', function (req, res, next) {
  client.query("SELECT * FROM move1 ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다211");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.post('/crt', function (req, res, next) {
  var body = req.body;
  client.query("INSERT INTO movecrt (crt) VALUES('?')",[
     body.crt], function(err, rows, fields){
    if(err){
      console.log("에러입니다2123");
    }
    else{
      res.json(rows);
      console.log(rows);
      console.log('어플에서 동작부(커튼) 데이터 전송 중..');
    }
}
)
});

router.post('/water', function (req, res, next) {
  var body = req.body;
  client.query("INSERT INTO movewater (water) VALUES(?)",[
     body.water], function(err, rows, fields){
    if(err){
      console.log("에러입니다2123");
    }
    else{
      res.json(rows);
      console.log(rows);
      console.log('어플에서 동작부(관수) 데이터 전송 중..');
    }
}
)
});

router.post('/fan', function (req, res, next) {
  var body = req.body;
  client.query("INSERT INTO movefan (fan) VALUES(?)",[
     body.fan], function(err, rows, fields){
    if(err){
      console.log("에러입니다2123");
    }
    else{
      res.json(rows);
      console.log(rows);
      console.log('어플에서 동작부(환풍) 데이터 전송 중..');
    }
}
)
});

router.post('/lamp', function (req, res, next) {
  var body = req.body;
  client.query("INSERT INTO movelamp (lamp) VALUES(?)",[
     body.lamp], function(err, rows, fields){
    if(err){
      console.log("에러입니다2123");
    }
    else{
      res.json(rows);
      console.log(rows);
      console.log('어플에서 동작부(전등) 데이터 전송 중..');
    }
}
)
});






router.post('/', function (req, res, next){
  var loginID = req.body.id;
  var loginPW = req.body.password;
  var loginsql = 'SELECT * FROM app where id =?';
  var name = '';
  client.query(loginsql, loginID, function(err, rows, fields){


    if(err){
      console.log('err : ' + err);
    }
    else{
      console.log(rows);
      if(rows[0] != undefined){
        if (loginPW != rows[0].password){
        console.log('패스워드가 일치하지 않습니다.');
        res.json('pass');
      }
      else{
        console.log('로그인 성공');

        res.json('suecc');
      }
    }
    else{
      console.log(rows[0]);
      console.log('해당 유저가 없습니다.');
      res.json('users');
    }
  }
  })

});




// 경로 매개변수를 사용한 라우팅: 특정 유저 정보 제공
router.get('/:id', function (req, res, next) {
  user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
});

module.exports = router;
