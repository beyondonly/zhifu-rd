var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")
var request = require("request");
var Path = require("path")
var http = require('http');
var https = require('https');
var superagent = require('superagent')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*首页推荐专栏*/
router.get("/indexListgetZhuanlan",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var limite = req.query.limit;
	var offset =req.query.offset;
	serverData.getZhuanlan(limite,offset,0,function(data){
		res.json(data)
	})
})

/*首页推荐文章*/
router.get("/indexListWenzhang",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var limite = req.query.limit;
	var offset =req.query.offset;
	serverData.getWenzhang(limite,offset,0,function(data){
		res.json(data)
	})
})

/*专栏详细信息*/
router.get("/getZhuanlanInfo",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var slug = "/"+req.query.slug;
	serverData.getZhuanlanInfo(slug,function(data){
		res.json(data)
	})
})

/*专栏文章列表*/
router.get("/getZhuanlanposts",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var slug = req.query.slug;
	serverData.getZhuanlanposts(slug,"20",function(data){
		res.json(data)
	})
})

/*文章详情*/
router.get("/getWenzhangText",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var Id = req.query.Id;
	serverData.getWenzhangText(Id,function(data){
		res.json(data)
	})
})

/*文章评论*/
router.get("/getWenzhangTextcomments",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var Id = req.query.Id;
	serverData.getWenzhangTextcomments(Id,10,function(data){
		res.json(data)
	})
})

/*文章被专刊收录*/
router.get("/getWenzhangTextcontributed",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var id = req.query.id;
	serverData.getWenzhangTextcontributed(id,function(data){
		res.json(data)
	})
})

/*相关推荐*/
router.get("/recommendations",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	serverData.getrecommendations(2,61,function(data){
		res.json(data)
	})
})


/*文章点赞接口*/
router.get("/getWenzhangTextLike",function(req,res,next) {
	serverData.getWenzhangTextLike("20808659",function(data){
		res.json(data)
	})
})


//图片中转器
router.get("/geturl",function(req,res,next) {
	res.set('Access-Control-Allow-Origin','*');
	var url = req.query.q;
	if(!url||url==undefined) {
		res.end();
	} 
	var statictype = Path.extname(url);
	serverData.transferImg(url,function(data){
		res.set('Content-Type', Contenttype(statictype));
		res.write(data.toString("base64"),"binary")
		res.end();
	})
})

function Contenttype(type) {
	var MIME = {
		".jpg":"image/jpeg",
		".png":"image/png"
	}
	return MIME[type]
}

//模拟登录
function login(callback) {
	nodegrass.get("https://www.zhihu.com/",function(data,status,headers){
		var cookie = headers['set-cookie'];
		var cookieupload = "";
		for(var i=0; i<cookie.length;i++) {
			cookieupload+=cookie[i].replace(/Path=\//g,"").replace(/Domain=zhihu.com;/g,"")
		}
		
		var str = headers['set-cookie'];
		var reg = /_xsrf/g;
		var _xsrf_str = "";
		for(var i=0;i<str.length;i++) {
			if(reg.test(str[i])){
				_xsrf_str = str[i]
			}
		}


		var rega = /_xsrf=(\w+)/ig; 
		_xsrf_str.replace(rega, function() { 
			var _xsrf= arguments[1];
			callback(_xsrf,cookieupload)
		}); 
	},"utf-8")
}
// login(function(data,cookieupload){
// 	var kk = 'q_c1=8fa71740180d4c11bfa3f55c4aa29c09|1467302654000|1467302654000; _xsrf=e3963da41a0754893a6f1878a39f6c60; l_cap_id="YWE4OThkOTU1ZmRmNDRhNTkzYTEyMTYzNjllN2FhZjY=|1467302654|07201c27cb05a583693a6ac6c5fb1b2a1b0d76f5"; cap_id="MmFhYjFkMTA2MmFiNDUzZGFjMjc4OWU4YjY0M2E3OTI=|1467302654|a76b86355bef9e6bc4259e74a0b576d2d69c0fb2"; n_c=1';
// 	var querystring = require('querystring');
// 	var data=querystring.stringify({password:"939593FCTLOVEDLX",remember_me:true,email:"825804189@qq.com",_xsrf:'e3963da41a0754893a6f1878a39f6c60',captcha:"n9vh"});
// 	var opt = {  
//         method: "POST",  
//         host: "www.zhihu.com",  
//         port: 443,  
//         path: "/login/email",  
//         headers: {
// 			"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
//         	"Accept":'*/*',
// 			'Accept-Encoding':'gzip, deflate, br',
// 			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
// 			'Cache-Control':'no-cache',
//             'Content-Type':"application/x-www-form-urlencoded",
//             "Connection":"keep-alive",
//             "Content-Length": data.length,
//             "Cookie":kk,
//             'Host':"www.zhihu.com",
// 			'Origin':"https://www.zhihu.com",
// 			"X-Requested-With":"XMLHttpRequest",
// 			"Pragma":"no-cache",
// 			"Referer":"https://www.zhihu.com/"
//         }  
// 	};  
// 	var req = https.request(opt, function (serverFeedback) { 
// 			console.log(serverFeedback.statusCode) 
//         serverFeedback.setEncoding('utf8');
//         serverFeedback.on("data",function(cendata) {
//         	var enddata = JSON.parse(cendata);
//         	console.log(enddata)
//         })
//         return;
//     }).on('error', function(e) {
//       console.log("Got error: " + e.message);
// 	});
// 	req.write(data);
// 	req.end();
// })

module.exports = router;
