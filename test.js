const express =require('express');
const bodyParser=require('body-parser');
const app=express();
const fs=require('fs');
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var mysql = require('mysql')
var connection = mysql.createConnection({host: "shreyashazure.mysql.database.azure.com", 
										user: "shreyash@shreyashazure", 
										password: "assassin1@", 
										database: "rvision", 
										port: 3306, 
										ssl:{ca:fs.readFileSync("./BaltimoreCyberTrustRoot.crt.pem")}});

connection.connect((err)=>
{
	if(err)
		throw err;
	console.log("Connected to databsase")
})
app.get('/',function (req,res){
	console.log("here");
	res.send('<h1>OH HI THERE, <br>THIS IS RVISION API</h1>');
})
app.post('/studentSignUp',(res,req)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Password,USN,Email,Batch,Fname,Lname,Image,Phone_no,Department,Semester,DoB,Courses}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`INSERT INTO Student VALUES('${USN}','${Fname}','${Lname}','${Email}','${Password}','${Image}','${Department}','${Phone_no}','${Semester}','${DoB}')`, function (err, rows, fields) {
			if (err)
				throw err;
		  console.log('The solution is: ' , rows)
		})
		for(let i=0;i<Courses.length;i++)
		{
			connection.query(`INSERT INTO enrollment VALUES('${USN}','${Courses[i]}')`, function (err, rows, fields) {
			if (err)
				throw err;
		  	console.log('The solution is: ' , rows)
			})
		}
		res.json("success");

});
app.post('/studentSignIn',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Password,Email}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT * FROM Student WHERE Email='${Email}'`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows[0])
		  	if(rows[0].Password==Password)
		  		res.json("success");
		  	else
		  		res.json("Wrong Credentials")
		  }
		})
});
app.post('/student/viewProfile',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Email}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT * FROM Student WHERE Email='${Email}'`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows[0])
		  	res.json(rows[0]);
		  }
		  else
		  	res.json("No Data")	
		})
});
app.post('/facultySignUp',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Password,FID,Email,Batch,Fname,Lname,Image,Phone_no,Department,Semester,DoB,Courses}=req.body;
		console.log(req.body)
		// // console.log(typeof(Name))
		connection.query(`INSERT INTO faculty VALUES('${FID}','${Fname}','${Lname}','${Email}','${Password}','${Image}','${Department}','${Phone_no}','${DoB}')`, function (err, rows, fields) {
			if (err)
				throw err;

		  console.log('The solution is: ' , rows)
		})
		for(let i=0;i<Courses.length;i++)
		{
			connection.query(`INSERT INTO handles VALUES('${FID}','${Courses[i]}')`, function (err, rows, fields) {
			if (err)
				throw err;
		  	console.log('The solution is: ' , rows)
			})
		}
		res.json("success");

});
app.post('/facultySignIn',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Password,Email}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT * FROM faculty WHERE Email='${Email}'`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows[0])
		  	if(rows[0].Password==Password)
		  		res.json("success");
		  	else
		  		res.json("Wrong Credentials")
		  }
		})
});
app.post('/faculty/viewProfile',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Email}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT * FROM faculty WHERE Email='${Email}'`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows[0])
		  	res.json(rows[0]);
		  }
		  else
		  	res.json("No Data")	
		})
});
app.post('/getCourses',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Department}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT CourseId FROM course WHERE Department_name='${Department}'`, function (err, rows, fields) {
			if (err)
				throw err;
			console.log(rows);
		  if(rows.length)
		  {
		  	res.json(rows);
		  }
		  else
		  	res.json("error");	
		})
});
app.post('/faculty/getCourses',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {FID}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`SELECT CourseId FROM handles WHERE FID='${FID}'`, function (err, rows, fields) {
			if (err)
				throw err;
			console.log(rows);
		  if(rows.length)
		  {
		  	res.json(rows);
		  }
		  else
		  	res.json("error");	
		})
});
app.post('/getCoursesName',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {Courses}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		let ret=[];
		for(let i=0;i<Courses.length;i++)
		{
			connection.query(`SELECT Name FROM course WHERE CourseId='${Courses[i].CourseId}'`, function (err, rows, fields) {
				if (err)
					throw err;
				ret.push(rows[0].Name);
				console.log(ret);
			  // if(rows.length)
			  // {
			  // 	res.json(rows);
			  // }
			  // else
			  // 	res.json("error");	
			  if(i==Courses.length-1)
			  		res.json(ret);
			})
	}
});
app.get('/getDepartments',(req,res)=>
{
		connection.query(`SELECT name FROM department`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows)
		  	res.json(rows);
		  }
		  else
		  	res.json("error")	
		})
});
app.post('/faculty/createQuestion',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		let {QID,FID,Score,CourseId,Qtype,Category}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`INSERT INTO question VALUES('${QID}','${Qtype}','${Score}','${Category}','${FID}','${CourseId}')`, function (err, rows, fields) {
			if (err)
			{
				console.log(err);
				res.json("failed");
			}
			else
				res.json("success");
			// console.log(rows[0].Password)
		})
});
app.post('/faculty/getQuestionCount',(req,res)=>
{
		let {CourseId, Category, Qtype,Score}=req.body;

		connection.query(`SELECT count(QID) n FROM question
						WHERE CourseId='${CourseId}' and  Category='${Category}' and Qtype='${Qtype}' and Score='${Score}'
							`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
			console.log(req.body)
		  if(rows.length)
		  {
		  	res.json(rows[0]);
		  }
		  else
		  	res.json("error")	
		})
});
app.post('/faculty/courseQuestions',(req,res)=>
{
		let {CourseId}=req.body;

		connection.query(`SELECT Qtype,Category, Score FROM question
						WHERE CourseId='${CourseId}'
							`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
			console.log("QUES",req.body)
		  if(rows.length)
		  {
		  	console.log(rows);
		  	res.json(rows);

		  }
		  else
		  	res.json("error")	
		})
});
app.post('/faculty/createTest',(req,res)=>
{
		let {CourseId,TestID,Semester,FID,Date}=req.body;
		console.log(req.body,"here");
		connection.query(`INSERT INTO test VALUES('${TestID}','${CourseId}','${Semester}','${FID}','${Date}')`, function (err, rows, fields) {
			if (err)
				throw err;
		res.json("success");
		})
	
});
app.post('/student/getTests',(req,res)=>
{
		let {USN}=req.body;

		connection.query(`select TestID from
							test natural join enrollment
							where enrollment.USN='${USN}'
							and TestID not in(select TestID from
							submission where USN='${USN}')
							`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
			console.log(req.body)
		  if(rows.length)
		  {
		  	res.json(rows);
		  }
		  else
		  	res.json("error")	
		})
});
app.post('/student/getQuestions',(req,res)=>
{
		let {Category,n,Score,type}=req.body;
		console.log(req.body);
		connection.query(`SELECT 
						    QID
							FROM
							question
							WHERE Category='${Category}' AND Score='${Score}' AND Qtype='${type}'
							ORDER BY RAND()
							LIMIT ${n}							
						`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
			console.log(rows)
		  if(rows.length)
		  {
		  	res.json(rows);
		  }
		  else
		  	res.json("error")	
		})
});
app.post('/student/submission',(req,res)=>
{

		console.log(req.body);
		let {USN,AnsIds,QIDs,TestID,Score,Qtypes,SubmissionID}=req.body;
		console.log(req.body);
		
		connection.query(`INSERT INTO submission VALUES('${SubmissionID}','${USN}','${TestID}','0')`, function (err, rows, fields) {
			if (err)
				throw err;	
		})
		for(let i=0;i<QIDs.length;i++)
		{
		connection.query(`INSERT INTO answer VALUES('${AnsIds[i]}','${USN}','${Qtypes[i]}','0')`, function (err, rows, fields) {
			if (err)
				throw err;	
		})
		connection.query(`INSERT INTO qas VALUES('${SubmissionID}','${AnsIds[i]}','${QIDs[i]}')`, function (err, rows, fields) {
			if (err)
				throw err;	
		})		
		}
	res.json("success");
});
app.listen(3000, () => {
	console.log(`Example app listening at ${connection.config.host}: ${3000}`)
  })