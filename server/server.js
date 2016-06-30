var nodegrass = require("nodegrass")

var Server = {};

/**
 * 首页推荐专栏
 * @param  limit = 条数 offset  = 起始位置 seed = 66
 * @return {[type]} [description]
 */
Server.getZhuanlan = function(limit,offset,seed,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/recommendations/columns?limit="+limit+"&offset="+offset+"&seed=66";
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		for(var i=0 ;i<enddata.length; i++) {
			var template = enddata[i].avatar.template;
			var id = enddata[i].avatar.id;
			var reg = /{id}_{size}/g;
			enddata[i].avatar = template.replace(reg, id);
		}
		callback(enddata)
	},"utf-8")
}

/**
 * 首页推荐文章
 * @param  limit = 条数 offset  = 起始位置 seed = 66
 * @return {[type]} [description]
 */
Server.getWenzhang = function(limit,offset,seed,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/recommendations/posts?limit="+limit+"&offset="+offset+"&seed=66";
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		callback(enddata)
	},"utf-8")
}

/**
 * 专栏详细信息
 * @param  urllink = "专栏后缀 来自于与推荐页 url"
 * @return {[type]} [description]
 */
Server.getZhuanlanInfo = function(urllink,callback) {
	console.log(urllink)
	var getLink = "https://zhuanlan.zhihu.com/api/columns"+urllink;
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);

		var id = enddata.avatar.id;
		var template = enddata.avatar.template;
		var reg = /{id}_{size}/g;
		endavatar = template.replace(reg, id);
		enddata.avatar = endavatar;
		callback(enddata)
	},"utf-8")
}

/**
 * 专栏文章列表
 * @param  limit = "专栏列表条数"
 * @return {[type]} [description]
 */
Server.getZhuanlanposts = function(sulg,limit,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/columns/"+sulg+"/posts?limit="+limit;
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		callback(enddata)
	},"utf-8")
}


/**
 * 文章详情
 * @param  Id = "文章编号 来源于列表 url_token" 
 * @return {[type]} [description]
 */
Server.getWenzhangText= function(Id,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/posts/"+Id;
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);

		//处理文章作者头像问题
		var id = enddata.author.avatar.id;
		var template = enddata.author.avatar.template;
		var reg = /{id}_{size}/g;
		endavatar = template.replace(reg, id);
		enddata.author.avatar = endavatar;

		//处理点赞人头
		for(var i=0,laster = enddata.lastestLikers;i<laster.length; i++) {
			var template = laster[i].avatar.template;
			var id = laster[i].avatar.id;
			var reg = /{id}_{size}/g;
			laster[i].avatar = template.replace(reg, id);
		}
		callback(enddata)
	},"utf-8")
}
/**
 * 文章评论
 * @param  Id = "文章编号 来源于列表 url_token limit限制条数" 
 * @return {[type]} [description]
 */
Server.getWenzhangTextcomments = function(Id,limit,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/posts/"+Id+"/comments?limit="+limit;
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		for(var i=0;i<enddata.length; i++) {
			var template = enddata[i].author.avatar.template;
			var id = enddata[i].author.avatar.id;
			var reg = /{id}_{size}/g;
			enddata[i].author.avatar = template.replace(reg, id);
		}
		callback(enddata)
	},"utf-8")
}


/**
 * 文章被专刊收录
 * @param  Id = "文章编号 来源于列表 url_token " 
 * @return {[type]} [description]
 */
Server.getWenzhangTextcontributed= function(Id,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/posts/"+Id+"/contributed";
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		callback(enddata)
	},"utf-8")
}

/**
 * 文章点赞用户列表
 * @param  Like = "文章编号 来源于列表 url_token " 
 * @return {[type]} [description]
 */
Server.getWenzhangTextLike= function(Id,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/posts/"+Id+"/likers";
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		callback(enddata)
	},"utf-8")
}

/**
 * 推荐阅读列表
 * @param  limit 条数限制 seed 获取id(任意)
 */

Server.getrecommendations = function(limit,seed,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/recommendations/posts?limit=2&seed=61";
	nodegrass.get(getLink,function(data){
		var enddata = JSON.parse(data);
		callback(enddata)
	},"utf-8")
}

/**
 * 图片中转路径
 * @type {[type]}
 */
Server.transferImg = function(url,callback) {
	nodegrass.get(url,function(data){
		callback(data)
	},"binary")
}
module.exports = Server;
