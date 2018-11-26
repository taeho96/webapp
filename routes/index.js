var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require('fs');
const ps = require('python-shell');
var urlencode = require('urlencode')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var result = ' ';
var datelist = [];
var pmlist = [];

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
      res.end(body);
    } else{
        var allData = JSON.parse(body);

        for(var i=0; i<allData.list.length; i++) {

          datelist.push(allData.list[i].dataTime);
          pmlist.push(allData.list[i].pm10Value);

      }
    }
  });
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

  console.log(datelist[0]);
  res.render('index', {datelist: datelist, pmlist: pmlist, result: result});
});




module.exports = router;
