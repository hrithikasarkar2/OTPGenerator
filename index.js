var express       = require('express');
var bodyParser    = require('body-parser');
const mysql_conn       =  require('./db_connection/db_connection');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log('log file ')
app.get('/',function(req,resp){

	resp.render('index')


});
app.post('/',function(req,resp){

    var pno =req.body.PNo
    var email =req.body.email
    var contact =req.body.mobile
    console.log(pno+email+contact)
	console.log(req.body)
	var insert_data ={
		USER_ID:pno,
		EMAIL:email,
		MOBILE_NUMBER:contact,
		PASSWORD:''
	
	
}
	var query = "insert into project_table set ?"
	mysql_conn.query(query,insert_data,function(err){
		if(!err){
			console.log('data inserted')
		}else{
             console.log(err);
		}
	})
	resp.render('success',{title:'Home Page',status:'Successfully registered'})


})

app.get('/getdata',function(req,resp){

	var query = "SELECT * FROM project_table WHERE USER_ID=?";
	mysql_conn.query(query,'1234',function(err,data){
		if(!err){
			console.log(data);
			resp.render('display_data',{title:'Home Page',status:'Successfully registered',data:data})


		}else{
			console.log(err)
		}
	})
})
app.listen('94',()=>console.log('Server running at port 94'));