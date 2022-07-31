const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));


// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "mysqltest"
})


router.get("/:curpage", function(req, res){

  var page_size = 10;
  var page_list_size = 10;
  var no = "";
  var totalpagecount = 1;

  var querystring = 'select count(*) as cnt from main;'

  client.query(querystring, function(error2, data){
    if(error2){
      console.log(error2 + "메인 화면의 mysql 데이터 조회 실패");
      return
    }

    totalpagecount = data[0].cnt

    var curpage = req.params.curpage;

    console.log("현재 페이지 : " + curpage, "전체 페이지 : " + totalpagecount);

    if(totalpagecount < 0){
      totalpagecount = 0;
    }
    var totalpage = Math.ceil(totalpagecount / page_size);  /*전체 페이지수*/
    var totalset = Math.ceil(totalpage / page_list_size);  /* 전체 세트 수 */
    var curset = Math.ceil(curpage / page_list_size)      /* 현재 세트내 출력될 시작 페이지 */
    var startpage = ((curset - 1) * 10) + 1              /*현재 세트 내에서 출력 될 시작 페이지 */
    var endpage = (startpage + page_list_size) - 1 ;     /* 현재 세트 내 출력될 마지막 페이지 */


    // 현재 페이지가 0보다 작다면
    if (curpage < 0){
      no = 0
    }
    else{
       // 0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
      no = (curpage -1) * 10
    }

    console.log('[0] curpage : ' + curpage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalpage + ' | [4] totalSet : ' + totalset + ' | [5] curSet : ' + curset + ' | [6] startPage : ' + startpage + ' | [7] endPage : ' + endpage)

    var result2 = {
      "curpage": curpage,
      "page_list_size": page_list_size,
      "page_size": page_size,
      "totalpage": totalpage,
      "totalset": totalset,
      "curset": curset,
      "startpage": startpage,
      "endpage": endpage
    };


    fs.readFile('views/main.ejs', 'utf-8', function (error, data) {

    if (error) {
    console.log("ejs오류" + error);
    return
    }
    console.log("몇번부터 몇번까지냐~~~~~~~" + no)

    var queryString = 'select * from main order by id desc limit ?,?';
    client.query(queryString, [no, page_size], function (error, result) {
    if (error) {
    console.log("페이징 에러" + error);
    return
    }
    res.send(ejs.render(data, {
    data: result,
    pasing: result2
    }));
    });
    });





  })

})



//메인화면
router.get("/", function(req,res){
  console.log("메인화면")
  res.redirect('/main/' + 1)
});











module.exports = router;
