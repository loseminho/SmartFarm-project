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


router.get('/', function (req, res, next) {
  client.query("SELECT * FROM copy ORDER BY id DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다1");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});

router.get('/test', function (req, res, next) {
  client.query("SELECT * FROM copy1 ORDER BY id DESC LIMIT 1;", function(err, rows, fields){
    if(err){
      console.log("에러입니다1");
    }
    else{
      res.json({minho: rows});
      console.log(rows);
    }
  })
});




router.post('/test', function (req, res, next) {
  var body = req.body;

  client.query("INSERT INTO copy1 (Temperature, Humidity, Lightness, SoilHumidity, Co2 ) VALUES(?,?,?,?, ?)",[
     body.Temperature, body.Humidity,body.Lightness, body.SoilHumidity,body.Co2 ], function(err, rows, fields){
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




// 경로 매개변수를 사용한 라우팅: 특정 유저 정보 제공
router.get('/:id', function (req, res, next) {
  user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
});

module.exports = router;
