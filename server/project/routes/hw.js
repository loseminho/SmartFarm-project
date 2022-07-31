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

//HW의 테이블의 가장 최근  6행을 호출한다.
router.get('/app', function (req, res, next) {
  client.query("SELECT * FROM hw ORDER BY NB DESC LIMIT 6;", function(err, rows, fields){
    if(err){
      console.log("에러입니다1");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

//HW의 테이블의 가장 최근 한 행의 한줄을 호출한다.
router.get('/', function (req, res, next) {
  client.query("SELECT * FROM hw ORDER BY NB DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다1");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

//HW의 테이블의 가장 동작부 센서값 한줄을 호출한다.
router.get('/move1', function (req, res, next) {
  client.query("SELECT * FROM move1 ORDER BY num DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
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

router.post('/ttt', function (req, res, next) {
  var body = req.body;
  client.query("INSERT INTO hw (Temperature) VALUES(?)",[
     body.Temperature], function(err, rows, fields){
    if(err){
      console.log("에러입니다2");
    }
    else{
      res.json(rows);
      console.log(rows);
    }
}
)
});



router.post('/test', function (req, res, next) {
  var body = req.body;

  console.log(req.body);
  console.log(body.Temperature);
  console.log(body.Humidity);

//센서값 통합 전송
  client.query("INSERT INTO hw (Temperature, Humidity, Lightness, SoilHumidity, Co2 ) VALUES(?,?,?,?, ?)",[
     body.Temperature, body.Humidity,body.Lightness, body.SoilHumidity,body.Co2 ], function(err, rows, fields){
    if(err){
      console.log("하드웨어 데이터 에러입니다2");
    }
    else{
      res.json(rows);
      console.log(rows);
      console.log('하드웨어 데이터 전송 중..');
    }
}
)

//센서값 각 테이블에 분할 전송
client.query("INSERT INTO sensor2 (data) VALUES('?')",[
  body.Temperature],function(err, rows, fields){
    if(err){
      console.log("온도 데이터 에러입니다2");
    }
    else{
      console.log('하드웨어 온도 데이터 전송 중..');
    }
}
)

client.query("INSERT INTO sensor3 (data) VALUES('?')",[
  body.Humidity], function(err, rows, fields){
  if(err){
    console.log("습도 데이터 에러입니다2");
  }
  else{
    console.log('하드웨어 습도 데이터 전송 중..');
  }
}
)

client.query("INSERT INTO sensor5 (data) VALUES('?')",[
  body.SoilHumidity], function(err, rows, fields){
  if(err){
    console.log("토양습도 데이터 에러입니다2");
  }
  else{
    console.log('하드웨어 토양습도 데이터 전송 중..');
  }
}
)

client.query("INSERT INTO sensor1 (data) VALUES('?')",[
  body.Lightness], function(err, rows, fields){
  if(err){
    console.log("조도 데이터 에러입니다2");
  }
  else{
    console.log('하드웨어 조도 데이터 전송 중..');
  }
}
)



client.query("INSERT INTO sensor4 (data) VALUES('?')",[
  body.Co2], function(err, rows, fields){
  if(err){
    console.log("Co2 데이터 에러입니다2");
  }
  else{
    console.log('하드웨어 Co2 데이터 전송 중..');
  }
}
)

});


// 경로 매개변수를 사용한 라우팅: 특정 유저 정보 제공
router.get('/:id', function (req, res, next) {
  user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
});

module.exports = router;
