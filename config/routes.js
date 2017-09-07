var PluginUser = require('../plugin/user');
var PluginBlog = require('../plugin/blog');

module.exports = function (app){

	app.use(function (req, res, next){
		var user = req.session.user;
		if(user){
			app.locals.user = user;
		}else{
			app.locals.user = user;
		};
		
		next();
	});


	app.get('/', function (req, res, next){
		res.render('index', { title: 'Index' });
	});
	
	//登录
	app.get('/login', PluginUser.loginNo, PluginUser.login.get);
	app.post('/login', PluginUser.login.post);
	
	//注册
	app.get('/reg', PluginUser.loginNo, PluginUser.reg.get);
	app.post('/reg', PluginUser.reg.post);
	
	//退出登录
	app.get('/logout', PluginUser.loginYes, PluginUser.logout.get);
	
	//个人资料
	app.get('/user/:_id', PluginUser.user.get);
	
	//发表
	app.get('/add',PluginUser.loginYes, PluginBlog.add.get);
	app.post('/add', PluginBlog.add.post);
	
	//内容
	app.get('/view/:_id', PluginBlog.view.get);	
	
	//列表
	app.get('/list', PluginBlog.list.get);
	
	//发布
	app.get('/apply', PluginBlog.apply.get);
	app.post('/apply', PluginBlog.apply.post);
	
	//项目内容
	app.get('/prject/:_id', PluginBlog.project.get);
	      //app.post('/prject/:_id', PluginBlog.project.post);
	
	//内容修改
	app.get('/list/:_id/editor', PluginBlog.editor.get);	
	app.post('/list/:_id/editor', PluginBlog.editor.post);	
}