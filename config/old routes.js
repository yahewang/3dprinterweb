    var ModuleUser = require('../model/user');
    var ModuleBlog = require('../model/blog');
	
    module.exports = function(app){
        app.use(function (req,res,next){
            var user = req.session.user;
            if(user){
                app.locals.user = user;          
            }else{
                app.locals.user = user;
                
            }
            next();
        });
        
        
        
        app.get('/',function (req,res,next){
            res.render('index', {title: 'BLOG' });
        });

        app.get('/login', function(req, res, next){
            res.render('login', {title: 'login' });
        });
        app.post('/login', function(req, res, next){
            var postData = {
                name: req.body.name
            };
            ModuleUser.findOne(postData, function (err, data){

                if (err) {
                    console.log(err);
                }
                if(data){
                    if(data.password == req.body.password){
                        
                        req.session.user = data;
                        res.redirect('/user/'+ data._id);
                        
                    }else{
                        res.send('Failed');
                    }
                }else{
                    res.send('No user');
                }


            });
        });


        app.get('/reg', function(req, res, next){
            res.render('reg', {title: 'register' });
        });

        app.post('/reg', function(req, res, next) {
            var postData = {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender
            };
            console.log(req.body);

            ModuleUser.findOne({
                name: req.body.name
            }, function (err, data) {
                if (err) 
                    console.log(err);
                
                if (data) {
                    res.send('User used');
                } else {
                    ModuleUser.create(postData, function (err, data) {

                        if (err) {
                            console.log(err);
                        }  
                        req.session.user = data;
                        res.send(data);
                        //res.send('Registed');
                    });
                }
            });
        });

            app.get('/logout', function (req, res, next) {
                delete req.session.user;
                res.redirect('/');
                
            });
           
            
            app.get('/user/:_id', function(req,res,next){
                var getData = {
                    _id: req.param('_id'),
                  
                };
                if(getData._id){
                    ModuleUser.findById(getData, function(err,data){
                            if (err)
                            console.log(err);
                            if (data){
                                res.render('user',{
                                    title: data.name + 'profile'
                                  
                                });
                            } else {
                                res.send('cannot find u');
                            }
                        });
                }else {
                    res.send(' NO User')
                }
            });
          
			 app.get('/add', function(req,res,next){
				 res.render('add',{
					 title: 'post'
					 });
					 });
			app.post('/add',function(req,res,next){
						 var postData={
							 author: req.session.user._id,
							 title: req.body.title,
							 content: req.body.content
						 };
						  console.log(req.body);
						  
						 ModuleBlog.create(postData,function(err,data){
							 if(err) console.log(err);

							 
							 res.redirect('/view/'+ data._id );
						 });
						 //res.send('succeed');
						 
					 });
					 
				app.get('/list',function(req,res,next){
					var aList = ModuleBlog.find({}, null,{ sort: { _id: -1} }).populate('user');
		
		aList.exec(function (err, data){
			if(err) console.log(err);
			res.render('list', {
				title: 'blog list',
				list: data
			});
			
		});
				});
					 
					 
					 
					 
					 
					 
					 
				app.get('/view/:_id', function(req,res,next){
				 var getData = {
					 _id: req.param('_id')
				 };
				 ModuleBlog.findOne(getData, function(err,data){
					 if(err) console.log(err);
					 if (data){
					 res.render('view',{
						 title: data.title,
						 view: data
					 });
					 }else{
						 res.send('no user');
					 }
					 });
				 
					 
					 });
					 }	 