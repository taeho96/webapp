var express = require('express');
var request = require('request');
var router = express.Router();
const ps = require('python-shell');
var result = ' ';


/* GET home page. */
router.get('/', function(req, res, next) {

  var service_key = 'ibuT0mjan%2FJ8ri2lFCSFWlDTuoIJ84M811nBburkoQAG9FaGb0JhSB0FpgrjQVAZ5iyZdzlHsthfqCCrBOakYw%3D%3D';

  var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty';
  var queryParams = '?staionName=종로구&dataTerm=DAILY&pageNo=1&numOfRows=10&ServiceKey=' + service_key + '&ver=1.3';
  var response = ' ';
  request({
    url: url + queryParams,
    method: 'GET'
  }, function (error, response, body) {
    console.log('Reponse received', body);
      resopnse = response;

});

  res.render('index', { result: ' ', start:'시작일', end:'마지막일', resopnse: response});
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
