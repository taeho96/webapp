var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require('fs');
const ps = require('python-shell');
var urlencode = require('urlencode')


var result = ' ';
var datetime;
var pm10;

/* GET home page. */
router.get('/', function(req, res, next) {

  var xml = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=ibuT0mjan%2FJ8ri2lFCSFWlDTuoIJ84M811nBburkoQAG9FaGb0JhSB0FpgrjQVAZ5iyZdzlHsthfqCCrBOakYw%3D%3D&numOfRows=5&pageSize=5&pageNo=1&startPage=1&stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=DAILY&ver=1.3&_returnType=json';

  request({
    encoding: "utf-8",
    url: xml,
    method: 'GET'
  }, function (error, response, body) {
    if(error) {
      console.log(error);
    } else{

      console.log('Reponse received', body.dataTime);
      datetime = body['dataTime'];
      pm10 = body['pmValue'];
    }
    });

  res.render('index', { result: ' ', start:'시작일', end:'마지막일' });
});


router.post('/', function(req, res) {
  console.log(req.body);


  var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: 'E:/webapp/public/python',
    args: [req.body.day1, req.body.day2, req.body.day3, req.body.day4]
  };

  ps.PythonShell.run('dataset.py', options, function (err, results) {

  console.log('results: %j', results);
  result = results;

  });

  res.render('index', {result:result, start:'시작일', end:'마지막일', method:"post"})
});

router.post('/date', function(req, res){
console.log(req.body);

  var start = req.body.start;
  var end = req.body.end;

  res.render('index', {result: ' ', start:start, end:end, method:"post"})
});

module.exports = router;
