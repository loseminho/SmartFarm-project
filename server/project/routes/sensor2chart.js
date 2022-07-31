const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "mysqltest"
})


router.get("/", function(req, res, next){
  var loginsql = 'SELECT * FROM sensor2';
  client.query(loginsql, function(err, rows,fields){
    if(err){
      console.log('err : '+ err );
    }
    else{
      res.render('sensor/sensor2chart', {chartData : rows});
    }
  });
});

module.exports = router;
