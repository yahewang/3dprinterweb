var ModuleBlog = require('../model/blog');

//微博发表
module.exports.add = {
	get: function (req, res, next){
		res.render('add',{
			title: '发表'
		});
	},
	post: function (req, res, next){
		
		var postData = {
			author: req.session.user._id,
			title: req.body.title,
			content: req.body.content
		};
		ModuleBlog.create(postData, function (err, data){
			
			if(err)console.log(err);
			res.redirect('/view/' + data._id);
			//res.send(data);
		});
	}
};

//时间



//微博列表
module.exports.list = {
	get: function (req, res, next){
		
		var aList = ModuleBlog.find({}, null,{ sort: { _id: -1} }).populate('user');
		
		aList.exec(function (err, data){
			if(err) console.log(err);
			res.render('list', {
				title: '微博列表',
				list: data
				
			});
			
		});
	
	

}
};

//微博内容
module.exports.view = {
	get: function (req, res, next){
		var getData = {
			_id: req.param('_id')  
		};
		
		ModuleBlog.findOne(getData, function (err, data){

			if(err) console.log(err);

			if(data){
				res.render('view', {
					title: data.title,
					view: data
				});
			}else{
				res.send('此用户，不存在。');
			}


		});
		
	}
};
//发布项目
module.exports.apply = {
	get: function (req, res, next){
		res.render('apply', { title: '发布项目' });
	},
	post: function (req, res, next){
		
		var postData = {
			 	name: req.body.name,
                company: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                goal: req.body.gender,
				image: req.body.image
		};



		ModuleBlog.create(postData, function (err, data){

			if(err)console.log(err);
			res.redirect('/project/' + data._id);
			//res.send(data);
		});
	}
};

//项目内容
module.exports.project = {
	get: function (req, res, next){
		var getData = {
			_id: req.param('_id')  
		};
		
		ModuleBlog.findOne(getData, function (err, data){
			
			if(err) console.log(err);
			
			if(data){
				res.render('project', {
					name: data.name,
					phone: data.phone,
					project: data
				});
			}else{
				res.send('此用户，不存在。');
			}
			
			
		});
		
	}
};



//修改
module.exports.editor = {
	get: function (req, res, next){
		var _id = req.param('_id')  
		ModuleBlog.findOne({
			_id: _id
		}, null, function (err, data){
			
			res.render('editor', {
				title: data.title,
				view: data
			});
		});
		//res.send('修改');
	},
	post: function (req, res, next){
		
		var body = req.body;
		var resJson = {
			status: false,
			msg: '',
			data: null
		};
		console.log('进来执行了' + body._id );
		ModuleBlog.update({
			_id: body._id
		}, {
			$set: {
				title: body.title,
				content: body.content
			}
		}, function (err){
			console.log('进来里面回调了');
			if(err) {
				resJson.msg = '修改失败';
				resJson.data = err;
			}else{
				resJson.msg = '修改成功';
				resJson.statue = true;
			}
			res.send(resJson);
			
		});
		
		//res.send('修改成功');
	}
};


