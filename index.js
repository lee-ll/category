var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app=express();
app.listen(18080,function(){
	console.log("18080端口监听成功")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var cn=mysql.createConnection({
	host:'sqld.duapp.com',
	port:4050,
	user:'505ab46a5b7649d28642b2eb27a67085',
	password:'5ac42f832a9743ae8b81bd3c8841fa97',
	database:'AHkRNmunuIKQMjDgXotR'
});
cn.connect();
app.get('/admin',function(req,res){
  res.sendFile(__dirname+'/site/view/admin.html');
})
app.get('/cats',function(req,res){
	var sql='select * from cats';
	cn.query(sql,function(err,row){
		res.json(row);
	})
})
.post('/cats',function(req,res){
	var sql='insert into cats set title=?,parentid=?';
	cn.query(sql,[req.body.title,req.body.id],function(err,row){
		res.json(row.insertId);
	})
})
.put('/cats',function(req,res){
	var sql='update cats set title=? where id=?';
	cn.query(sql,[req.body.title,req.body.id],function(err,row){
		if(!err){
			res.json({state:"ok"})
		}
		
	})
})
.delete('/cats',function(req,res){
	cn.query('delete from cats where id in ('+req.body.ids+')',function(err,row){
		res.json({state:'ok'})
	})
})
app.use(express.static(__dirname+'/site/public/'));