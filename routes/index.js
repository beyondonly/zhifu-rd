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
login(function(data,cookieupload){
	var kk = '_za=4b343ebd-a751-493c-9e8a-6095ba11e4df; _xsrf=7890b609478a1d2bae8d90d25fdcbac8; __utmt=1; _zap=f0a74007-6994-4773-8c35-d3946ad419f8; q_c1=b183d9b42f024722b45d044f97125e05|1467558289000|1467558289000; l_cap_id="YjA2ZDU5OGViYzhkNDI0ZjkxMmNkMzk0ZTM4MDdkNzY=|1467558289|6e918e6fa82f34260d4dbc1787df8e636f391df6"; cap_id="MzYxNjlhMGQ0NzYzNGM1ZWIxN2RiZGJhYTFkODQyNGU=|1467558289|9722a4c479c6570fcec0151c6f362fb10a7b3eb9"; d_c0="ADBApkNmLAqPTuzTwOnGtAPtzkw3QSrQY9s=|1467558289"; login="NGY3ZTZiNTkzODAyNDVmMGI1NDE3ZmY2YWE0YzdjNmU=|1467558428|921d3f1e077edbcd92195e00136855cc5db7eb33"; a_t="2.0AABA7soqAAAXAAAAHLegVwAAQO7KKgAAADBApkNmLAoXAAAAYQJVTRy3oFcABYHEsuqZvk4X4lsUGrKEjUwXya10epAsxor1U1Y4Yj6zO36YJGTZOw=="; z_c0=Mi4wQUFCQTdzb3FBQUFBTUVDbVEyWXNDaGNBQUFCaEFsVk5ITGVnVndBRmdjU3k2cG0tVGhmaVd4UWFzb1NOVEJmSnJR|1467558428|5b85e319ea9bed7dc960845d395a974fba8cf8fa; n_c=1; __utma=51854390.635298240.1467558479.1467558479.1467558479.1; __utmb=51854390.2.10.1467558479; __utmc=51854390; __utmz=51854390.1467558479.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmv=51854390.100-1|2=registration_date=20140404=1^3=entry_date=20140404=1';
	var querystring = require('querystring');
	var data=querystring.stringify({password:"aaa",remember_me:true,email:"825804189@qq.com",_xsrf:'7890b609478a1d2bae8d90d25fdcbac8',captcha:"n9vh"});
	var opt = {  
        method: "POST",  
        host: "www.zhihu.com",  
        port: 443,  
        path: "/login/email",  
        headers: {
			"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        	"Accept":'*/*',
			'Accept-Encoding':'gzip, deflate, br',
			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
			'Cache-Control':'no-cache',
            'Content-Type':"application/x-www-form-urlencoded",
            "Connection":"keep-alive",
            "Content-Length": data.length,
            "Cookie":kk,
            'Host':"www.zhihu.com",
			'Origin':"https://www.zhihu.com",
			"X-Requested-With":"XMLHttpRequest",
			"Pragma":"no-cache",
			"Referer":"https://www.zhihu.com/"
        }  
	};  
	var req = https.request(opt, function (serverFeedback) { 
			console.log(serverFeedback.statusCode) 
        serverFeedback.setEncoding('utf8');
        serverFeedback.on("data",function(cendata) {
        	var enddata = JSON.parse(cendata);
        	console.log(enddata)
        })
        return;
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
	});
	req.write(data);
	req.end();
})





module.exports = router;
