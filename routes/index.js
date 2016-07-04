var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")
var request = require("request");
var Path = require("path")
var http = require('http');
var https = require('https');
var LOGIN = require("../server/login.js");


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

// login(function(data,cookieupload){
// 	var kk = 'q_c1=65d7f9117f8f48eaa5d8e82fc9210024|1467560251000|1467560251000; _xsrf=30f26fce16909826f41eefa9d03a1d09; l_cap_id="NjMyMDZkYWRhYzE4NGEzMDlkYTA3YTNkZmZmZGFmZGY=|1467560251|4d82e5bd6ee2cb512f8e558d2f9b7d6ed553c1cf"; cap_id="NmMwZTNlYzgzYTBhNGFkNzkzYTY0ZWUxM2QxMzE3ZmE=|1467560251|3aeba14b8d4ea3fe83c23510b5dfdbd0a8eec5b7"; d_c0="ACCA479tLAqPTqzDDJ4ffUxftZq2FVsKcc8=|1467560252"; _zap=d29a24c3-235e-437c-84bd-87c2150a1b68; _za=c26df599-d3ac-40d4-92d3-aff5b25c0968; __utmt=1; __utma=51854390.1980691443.1467560252.1467560252.1467560252.1; __utmb=51854390.4.10.1467560252; __utmc=51854390; __utmz=51854390.1467560252.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmv=51854390.010--|3=entry_date=20160703=1; n_c=1';
// 	var querystring = require('querystring');
// 	var data=querystring.stringify({password:"939593FCTLOVEDLX",remember_me:true,email:"825804189@qq.com",_xsrf:'30f26fce16909826f41eefa9d03a1d09',captcha:"n9vh"});
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
// 			"Referer":"Referer:http://www.zhihu.com/signin?next=https://zhuanlan.zhihu.com/"
//         }  
// 	};  
// 	var req = https.request(opt, function (serverFeedback) { 
//         serverFeedback.setEncoding('utf8');
//         var endcookir = serverFeedback.headers['set-cookie'];
//         var _xsrf_endcookir = "";
//         var reg = /login/g;
//         for(var i=0;i<endcookir.length;i++) {
// 			if(reg.test(endcookir[i])){
// 				_xsrf_endcookir = endcookir[i]
// 			}
// 		}
		
//         serverFeedback.on("data",function(cendata,a,b) {
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


LOGIN(function(){

})


module.exports = router;
