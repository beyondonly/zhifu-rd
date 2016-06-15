var nodegrass = require("nodegrass")

var Server = {};

/**
 * 首页推荐专栏
 * @param  limit = 条数 offset  = 起始位置 seed = 66
 * @return {[type]} [description]
 */
Server.getZhuan = function(limit,offset,seed,callback) {
	var getLink = "https://zhuanlan.zhihu.com/api/recommendations/columns?limit="+limit+"&offset="+offset+"&seed=66";
	nodegrass.get(getLink,function(data){
		for(var i=0 ;i<data.length; i++) {
			console.log(data[i])
			var template = data[i].avatar.template;
			var id = data[i].avatar.id;
			var reg = /{id}_{size}/g;
			template.replace(reg, template);
			console.log(template)
		}
	},"utf-8")
}
module.exports = Server;
