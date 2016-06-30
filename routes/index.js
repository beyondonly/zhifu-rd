var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")
var request = require("request");
var Path = require("path")

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



module.exports = router;
