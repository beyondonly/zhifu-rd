var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/indexList",function(req,res,next) {
	serverData.getZhuan(8,0,0,function(data){
		res.json(data)
	})
})
module.exports = router;
