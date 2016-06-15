var express = require('express');
var router = express.Router();
var nodegrass = require("nodegrass")
var serverData = require("../server/server.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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




module.exports = router;
