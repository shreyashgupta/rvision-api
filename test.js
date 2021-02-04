const express =require('express');
const bodyParser=require('body-parser');
const app=express();
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
const fs=require('fs');
var cors = require('cors')
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var mysql = require('mysql')
var connection = mysql.createConnection(
										{host: "3.129.230.190", 
										user: "ubuntu",
										password: "qwerty", 
										database: "rvision", 
										port: 3306});

connection.connect((err)=>
{
	if(err)
		throw err;
	console.log("Connected to databsase")
})
app.get('/',async function (req,res){
	console.log("here");
	res.send('<h1>OH HI THERE, <br>THIS IS RVISION API</h1>');
	  
})
app.post('/studentSignUp',(req,res)=>
{
		// const {name,email,password}=req.body;
		// const hash=bcrypt.hashSync(password);
		console.log(req.body);
		let {Password,USN,Email,Batch,Fname,Lname,Image,Phone_no,Department,Semester,DoB,Courses}=req.body;
		console.log(req.body)
		// console.log(typeof(Name))
		connection.query(`INSERT INTO student VALUES('${USN}','${Fname}','${Lname}','${Email}',md5('${Password}'),'${Image}','${Department}','${Phone_no}','${Semester}','${DoB}')`, function (err, rows, fields) {
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
		connection.query(`SELECT * FROM student WHERE Email='${Email}' AND Password=md5('${Password}')`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
			  console.log(rows[0])
			  res.json("success");
		  }
		  else
		  {
			  res.json("Wrong credentials");
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
		connection.query(`SELECT * FROM student WHERE Email='${Email}'`, function (err, rows, fields) {
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
		connection.query(`INSERT INTO faculty VALUES('${FID}','${Fname}','${Lname}','${Email}',md5('${Password}'),'${Image}','${Department}','${Phone_no}','${DoB}')`, function (err, rows, fields) {
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
		connection.query(`SELECT * FROM faculty WHERE Email='${Email}' AND Password=md5('${Password}')`, function (err, rows, fields) {
			if (err)
				throw err;
			// console.log(rows[0].Password)
		  if(rows.length)
		  {
		  	console.log(rows[0])
		  	res.json("success");
		  }
		  else 
		  {
			  res.json("Wrong credentials");
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
			console.log(AnsIds[i] + ", "+ Qtypes[i]);
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
app.listen(process.env.PORT || 3000, () => {
	console.log(`app listening at ${process.env.PORT}`)
  })
  app.post('/faculty/subEvaluate',(req,res)=>
  {
		  let {FID}=req.body;
  
		  connection.query(`select AnswerID,QID from 
							answer natural join qas 
							where answer.AnswerID IN
							(select AnswerID from
							question natural join qas
							where FID="${FID}") AND AnswerType="Sub"
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
  app.get('/faculty/evaluate/getTests',(req,res)=>
  {
		connection.query(`select DISTINCT(TestID) from 
		  					submission natural join test
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
  app.post('/faculty/updateSubmissions',async(req,res)=>
  {
		let {TestID}=req.body;
		connection.query(`select SubmissionID from
			submission where TestID='${TestID}' 
			`, function (err, rows, fields) {
				if (err)
				throw err;
				if(rows.length)
				{
					rows.map((x,i)=>
					{
					connection.query(`UPDATE submission 
										SET Score = (
										SELECT SUM(Score) FROM answer
										WHERE AnswerID IN (SELECT AnswerID FROM qas WHERE SubmissionID='${x.SubmissionID}')
										)
										WHERE SubmissionID='${x.SubmissionID}'`, function (err, rows, fields) {
										if (err)
											throw err;
										console.log("updated sub");
										})
					})			
					res.json("success");				
				}
				else
					res.json("error");
			})
  });
  app.post('/faculty/evaluate',async(req,res)=>
  {
	  let {TestID}=req.body;
	  let qas=[];
	  connection.query(`select * from qas
						where SubmissionID in
						(select SubmissionID from
						submission where TestID='${TestID}' )
					`, async function (err, rows, fields) {
						if (err)
							throw err;
						// console.log(rows[0].Password)
						//console.log(rows)
						if(rows.length)
						{
							rows.map(async(x,i)=>
							{
								let aid=x.AnswerID;
								let qid=x.QID;
								let ans,ques;
								console.log(aid,qid)
								await firestore.collection("answer").doc(aid)
								.get()
								.then(function(doc) {
								if (doc.exists) {
									ans=doc.data();
								} else {
									console.log("No such ans document!");
								}
								}).catch(function(error) {
								console.log("Error getting ans document:", error);
								}); 
					
								await firestore.collection("question").doc(qid)
								.get()
								.then(function(doc) {
								if (doc.exists) {
									ques=doc.data();
								} else {
									console.log("No such ques document!");
								}
								}).catch(function(error) {
								console.log("Error getting ques document:", error);
								}); 
								//console.log(ques,ans);
								let score=ques.score;
								let flag=false;
								let subEval=false;
								console.log(ques.questionType, ans.studentScore);
								if(ques.questionType=='Sub' && ans.studentScore==-1)
									subEval=true;
								//console.log(score);
								if(subEval && ans.answerImages.length==0 && ques.modelAnswerAvailable)
								{
									var score1;

									//evaluation 
									score1=await fetch(`https://api.dandelion.eu/datatxt/sim/v1?token=bdaae0974cad4108b1ab79b35d0baaeb&text1=${ques.modelAnswer}&text2=${ans.answerText}`)
									  .then(response=> response.json())
									  .then(response=>response);
									score=Math.ceil(score1.similarity*(ques.score));
									flag=true;
									console.log(score);
								}
								else if(ques.questionType=='MCQ')
								{
									if(ques.correctChoice==ans.chosenOption)
									{
										flag=true;
									}
									subEval=true;
								}
								else if(ques.questionType=='FIB')
								{
									// console.log(ques.acceptedAnswers,ans.answerContent);
									if(ques.acceptedAnswers.indexOf(ans.answerContent)!=-1)
										flag=true;
									subEval=true;
								}
								if(!flag)
								{
									score=0;		// console.log(rows[0].Password)
								}
								if(subEval)
								{
									connection.query(`
									UPDATE answer
									SET Score='${score}' WHERE AnswerID='${aid}'
									`, function (err, rows, fields) {
										if (err)
											throw err;
									}
									)
									const ansref = firestore.collection('answer').doc(aid);
									const res = await ansref.update({studentScore:score})
									.catch(function(error) {
										console.log("Error getting document:", error);
										}); 
								}
								}
							)
							res.json("success");
						}
						else
							res.json("error")	
					})
					
	//   select SubmissionID from submission where Tese
  });
  app.post('/faculty/fts/getTids',(req,res)=>
  {
		  let {semester,course,fromDate,toDate}=req.body;

		  connection.query(`SELECT * FROM test t
							WHERE CourseId='${course}' AND 
							t.Date BETWEEN '${fromDate}' AND '${toDate}';
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			  // console.log(rows[0].Password)
			  console.log(req.body);
			  console.log(rows)
			if(rows.length)
			{
				res.json(rows);
			}
			else
				res.json("error")	
		  })
  });
  app.post('/faculty/fts/updateTest',(req,res)=>
  {
		  let {TestID}=req.body;

		  connection.query(`select TestID, count(distinct USN) 
							as attemptedBy, max(Score) as maxScore, 
							avg(Score) as avgScore, min(Score) as minScore
		  					from submission
		  					where TestID='${TestID}';
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			  // console.log(rows[0].Password)
			  console.log(req.body);
			  console.log(rows)
			if(rows.length)
			{
				res.json(rows);
			}
			else
				res.json("error")	
		  })
  });
  app.post('/faculty/fts/USNScore',(req,res)=>
  {
		  let {TestID,USN}=req.body;

		  connection.query(`SELECT Score FROM submission 
		  WHERE USN='${USN}' AND TestID='${TestID}';
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			  // console.log(rows[0].Password)
			  console.log(req.body);
			  console.log(rows)
			if(rows.length)
			{
				res.json(rows);
			}
			else
				res.json("error")	
		  })
  });

  app.post('/faculty/subjectiveEval',(req,res)=>
  {
		  let {AnswerID,Score}=req.body;
		  console.log(req.body);

		  connection.query(`UPDATE answer
							  SET Score=Score+'${Score}'
							  WHERE AnswerId='${AnswerID}'
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			if(rows.length==0)
				res.json("error")	
		  })
		  connection.query(`UPDATE submission
							SET Score=Score+'${Score}'
							WHERE SubmissionID =
							(
								SELECT SubmissionID FROM qas
								WHERE AnswerID='${AnswerID}'
							);
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			if(rows.length==0)
				res.json("error")	
		  })
		  res.json("success");
  });
  app.post('/student/getCourses',(req,res)=>
  {
		  let {USN}=req.body;
		  connection.query(`SELECT CourseId FROM 
		  					enrollment WHERE USN='${USN}'
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			if(rows.length)
				res.json(rows)
			else
				res.json("error")
					
		  })
  });
  app.post('/student/report/getTests',(req,res)=>
  {
		  let {USN,course,fromDate,toDate}=req.body;
		  connection.query(`
							SELECT TestID, SubmissionID,Date,Score
							FROM test NATURAL JOIN submission
							WHERE CourseId='${course}' AND USN='${USN}' AND Date BETWEEN '${fromDate}' AND '${toDate}';
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			if(rows.length)
				res.json(rows)
			else
				res.json("error")
					
		  })
  });
  app.post('/student/report/getSummary',(req,res)=>
  {
		  let {TestID}=req.body;
		  connection.query(`SELECT TestID, COUNT(distinct USN) AS attemptedBy, MAX(Score) AS maxScore, AVG(Score) AS avgScore, MIN(Score) AS minScore
		  FROM submission
		  WHERE TestID='${TestID}';
							  `, function (err, rows, fields) {
			  if (err)
				  throw err;
			if(rows.length)
				res.json(rows)
			else
				res.json("error")
					
		  })
  });
  app.post('/student/getSubmission',(req,res)=>
  {
		  let {sid}=req.body;
		  connection.query(`SELECT AnswerID,QID 
							  FROM qas 
							  WHERE SubmissionID='${sid}'
							  `, function (err, rows, fields) {
			if (err)
				  throw err;
			console.log(rows);					
			if(rows.length)
				res.json(rows)
			else
				res.json("error")
					
		  })
  });
  app.post('/changePassword',(req,res)=>
  {
		let {Email,OldPass,NewPass,Student}=req.body;
		console.log(Email,OldPass,NewPass,Student);
		if(Student)
		{
			connection.query(`UPDATE student 
								SET Password=md5('${NewPass}')
								WHERE Email='${Email}' AND Password=md5('${OldPass}')
								`, function (err, rows, fields) {
			if (err)
					throw err;				
			if(rows.length)
				res.json("success")
			else
				res.json("error")		
			})
		}
		else
		{
			connection.query(`UPDATE faculty
								SET Password=md5('${NewPass}')
								WHERE Email='${Email}' AND Password=md5('${OldPass}')
								`, function (err, rows, fields) {
			if (err)
					throw err;				
			if(rows.length)
				res.json("success")
			else
				res.json("error")		
			})
		}

  });