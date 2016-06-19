var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/kk', function(req, res, next) {
  res.render('kk');
});

/*首页推荐专栏*/
router.get("/indexListgetZhuanlan",function(req,res,next) {
	serverData.getZhuanlan(8,0,0,function(data){
		res.json(data)
	})
})

/*首页推荐文章*/
router.get("/indexListWenzhang",function(req,res,next) {
	serverData.getWenzhang(8,0,0,function(data){
		res.json(data)
	})
})

/*专栏详细信息*/
router.get("/getZhuanlanInfo",function(req,res,next) {
	serverData.getZhuanlanInfo("/mutongyumu",function(data){
		res.json(data)
	})
})

/*专栏文章列表*/
router.get("/getZhuanlanposts",function(req,res,next) {
	serverData.getZhuanlanposts("20",function(data){
		res.json(data)
	})
})

/*文章详情*/
router.get("/getWenzhangText",function(req,res,next) {
	serverData.getWenzhangText("20808659",function(data){
		res.json(data)
	})
})

/*文章评论*/
router.get("/getWenzhangTextcomments",function(req,res,next) {
	serverData.getWenzhangTextcomments("20808659",10,function(data){
		res.json(data)
	})
})

/*文章被专刊收录*/
router.get("/getWenzhangTextcontributed",function(req,res,next) {
	serverData.getWenzhangTextcontributed("20808659",function(data){
		res.json(data)
	})
})

/*文章点赞接口*/
router.get("/getWenzhangTextLike",function(req,res,next) {
	serverData.getWenzhangTextLike("20808659",function(data){
		res.json(data)
	})
})

function nicai() {
	var options = {
		 url: 'https://zhuanlan.zhihu.com/api/posts/20733973/rating',
		 method: 'put',
		 multipart:
	      [{ 
      		'content-type': 'application/json', 
      		'body': JSON.stringify({value:"like"})
	      }],
		 headers: {
		 	"Cookie" : "_xsrf=2|469a130a|08a47007976cc36c636f9f5374496d18|1465991806; __utmt=1; q_c1=bc9f85105cef437aa5b37860d400e544|1466004767000|1466004767000; l_cap_id='ZmE1ODU2ZmMzNDNkNGRlN2E3NThjNjlmOGRlMzQ0NmY=|1466004767|1505ffc645b935e5592d03d3c4ccfb4857594eac'; cap_id='YmM2Yjk0MDYyZTBhNDY5OWI2NmVlZjBjNDU1ODM4YjU=|1466004767|f3f2a1c118f8c714005ef92bbcf076ed566ef8c3'; d_c0='ACDA9w1AFQqPTjbNaU5KR2rYkE-GNulgMUo=|1466004769'; _zap=f3514084-a15c-4ae3-85f6-1c16dff6af8a; login='MjkwNTRkOTg1MjNiNDExZDk1Zjg4OTgzNzM0ZjBhMzY=|1466004780|2490b2e693b8cc3efbe49fe221a23528cfe5c3b2'; a_t='2.0AABA7soqAAAXAAAAMwKJVwAAQO7KKgAAACDA9w1AFQoXAAAAYQJVTTMCiVcA2ow-mi_TqSLdpy3MfJW0r3UihvJfj98wALDwyBKifq4saEM5G_n-zQ=='; z_c0=Mi4wQUFCQTdzb3FBQUFBSU1EM0RVQVZDaGNBQUFCaEFsVk5Nd0tKVndEYWpENmFMOU9wSXQybkxjeDhsYlN2ZFNLRzhn|1466004787|28657f9af3ceaf6ff07c568f9de58c223bc4a7a7; n_c=1; __utma=155987696.2062287761.1466004789.1466004789.1466004789.1; __utmb=155987696.2.10.1466004789; __utmc=155987696; __utmz=155987696.1466004789.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/signin; XSRF-TOKEN=2|53152903|1d2b4a0e82e3f96576e0a55a61c65711|1465991806",
		 	"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
		 	"X-XSRF-TOKEN": "2|53152903|1d2b4a0e82e3f96576e0a55a61c65711|1465991806",
		 	'Host':"zhuanlan.zhihu.com",
			'Origin':"https://zhuanlan.zhihu.com",
			'Referer':"https://zhuanlan.zhihu.com/p/20733973",
			'Accept':'application/json, text/plain', 
			'Accept-Encoding':'gzip, deflate, sdch, br',
			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
			'Connection':'keep-alive',
			'Content-Length':16,
			'Content-Type':'application/json;charset=UTF-8'
		}
	};

	function callback(error, response, body) {
		console.log(response.statusCode)
	}

	request.put(options, callback);
}



module.exports = router;
