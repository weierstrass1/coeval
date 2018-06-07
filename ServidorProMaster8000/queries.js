var conection = require('./connection');

function databaseMethods()
{

    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //USER LOGIN
    this.getUserLoginById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM user,user_login WHERE user.user_id=user_login.user_id AND user.user_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain user by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }
    
    this.postUserLogin=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO user_login set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert user_login by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }



    this.updateUserLogin=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE user_login set ? WHERE user_login_id= ?",[data,data.user_login_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update user_login by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    //USER

    this.getUser = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM user,user_data WHERE user.user_data_id=user_data.user_data_id',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain users.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getUserById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM user,user_data WHERE user.user_data_id=user_data.user_data_id AND user_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain user by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getLastUser = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT MAX(user_id) AS user_id FROM user',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain user by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postCompleteUser=function (data, response){
        conection.obtain(function(e,con){
            con.query("INSERT INTO user_data set ? ",data, function(error, result){
                //for each query statment exist a result id-> first statment result[0], second statment result[1]
                
                if(error)
                {
                    response.send('Error at trying to send insert statment ');
                }
                else
                {
                    con.query("SELECT MAX(user_data_id) AS user_data_id FROM user_data", function(er, re){
                        if(er)
                        {
                            response.send("error tratando de seleccionar el ultimo id");
                        }
                        else{
                            data2=re;
                            con.query("INSERT INTO user set ?", data2, function (errorr, resultt){
                                if(errorr){
                                    response.send("unable to insert statment");
                                }
                                else{
                                    response.send({result: "ok"});
                                }
                            });
                            
                        }
                    });
                }
                con.release();
            });
        });
    }

    this.updateUserData=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE user_data set ? WHERE user_data_id= ?",[data,data.user_data_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update user_data by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteUserById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            iserror = false;
            con.query('DELETE FROM user_login WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain user_login by id.');
                    iserror=true;
                }
            })
            con.query('DELETE FROM teacher WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain teacher by id.');
                    iserror=true;
                }
            })
            con.query('DELETE FROM admin WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain admin by id.');
                    iserror=true;
                }
            })
            con.query('DELETE FROM evaluation_user WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain evaluation_user by id.');
                    iserror=true;
                }
            })
            con.query('SELECT student_id FROM student WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to select student by id.');
                    iserror=true;
                }
                else
                {
                    data2=0;
                    try
                    {
                        data2 = result1[0].student_id;
                    }
                    catch(err)
                    {

                    }
                    con.query('DELETE FROM answer WHERE student_id =?',data2,function(error2,result2)
                    {
                        if(error2)
                        {
                            response.send('Error at trying to obtain answer by id.');
                            iserror=true;
                        }
                    })
                }
            })
            con.query('DELETE FROM student WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain student by id.');
                    iserror=true;
                }
            })
            con.query('DELETE FROM review WHERE user_id =?',id,function(error1,result1)
            {
                if(error1)
                {
                    response.send('Error at trying to obtain review by id.');
                    iserror=true;
                }
            })

            con.query('SELECT user_data_id FROM user WHERE user_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to select user by id.');
                    iserror=true;
                }
                else
                {
                    data2 = 0;
                    try
                    {
                        data2 = result[0].user_data_id;
                    }
                    catch(err)
                    {

                    }
                    
                    con.query('DELETE FROM user WHERE user_id =?',id,function(error1,result1)
                    {
                        if(error1)
                        {
                            response.send('Error at trying to obtain user by id.');
                            iserror=true;
                        }
                    })

                    con.query('DELETE FROM user_data WHERE user_data_id = ?',data2,function(error1,result1)
                    {
                        if(error1)
                        {
                            response.send('Error at trying to obtain user_data by id.');
                            iserror=true;
                        }
                    })
                }
            })
            if(!iserror)
            {
                response.send("All content of the user deleted");
            }
            con.release();
        })
    }

    //ADMIN

    this.getAdmin = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM admin,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = admin.user_id',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain admins.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getAdminById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM admin,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = admin.user_id AND admin_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain admin by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postAdmin=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO admin set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert admin by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteAdminById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM admin WHERE admin_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain admin by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    //TEACHER

    this.getTeacher = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM teacher,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = teacher.user_id',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain teachers.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getTeacherById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM teacher,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = teacher.user_id AND teacher_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain teacher by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }
    
    this.postTeacher=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO teacher set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert teacher by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteTeacherById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM teacher WHERE teacher_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain teacher by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    //STUDENT

    this.getStudent = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM student,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = student.user_id',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain students.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getStudentById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM student,user,user_data WHERE user.user_data_id=user_data.user_data_id AND user.user_id = student.user_id AND student_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain student by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }
    
    this.postStudent=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO student set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert student by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteStudentById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM student WHERE student_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain student by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    //QUESTION
    
    this.getQuestion = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM question',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain questions.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getQuestionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM question WHERE question_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain question by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getQuestionByIdRubric = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT question_id,rubric.rubric_id,question.text as question_text,rubric.text as rubric_text,total_score  FROM question,rubric WHERE question_id =? AND rubric.rubric_id=question.rubric_id',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain question rubric by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getQuestionByIdAnswer = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT question.question_id,question.text as question_text,answer_id,student_id,answer.text as answer_text,total_score  FROM question,answer WHERE question.question_id =? AND answer.question_id=question.question_id',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain question answer by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postQuestion=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO question set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert question by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.updateQuestion=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE question set ? WHERE question_id = ?",[data,data.question_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update question by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteQuestionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM answer WHERE question_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain answer by id.');
                }
            })
            con.query('DELETE FROM question_section WHERE question_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain question_section by id.');
                }
            })
            con.query('SELECT rubric_id FROM question WHERE question_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain question by id.');
                }
                else
                {
                    data2 = 0;
                    try
                    {
                        data2 = result[0].rubric_id;
                    }
                    catch(err)
                    {

                    }
                    con.query('DELETE FROM question WHERE question_id =?',id,function(error1,result1)
                    {
                        if(error1)
                        {
                            response.send('Error at trying to obtain question by id.');
                        }
                    })
                    con.query('DELETE FROM rubric WHERE rubric_id =?',data2,function(error1,result1)
                    {
                        if(error1)
                        {
                            response.send('Error at trying to obtain rubric by id.');
                        }
                    })
                    
                }
            })
            con.release();
            response.send('All question content deleted');
        })
    }

    //RUBRIC
    
    this.getRubric = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM rubric',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain rubrics.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getRubricById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM rubric WHERE rubric_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain rubric by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postRubric=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO rubric set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert rubric by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.updateRubric=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE rubric set ? WHERE rubric_id = ?",[data,data.rubric_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update rubric by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    //ANSWER
    
    this.getAnswer = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM answer',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain answers.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getAnswerById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM answer WHERE answer_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain answer by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getAnswerByIdReview = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM answer,review WHERE answer.answer_id=review.answer_id AND answer.answer_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain answer review by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postAnswer=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO answer set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert answer by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    //REVIEW
    
    this.getReview = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM review',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain reviews.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getReviewById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM review WHERE review_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain review by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postReview=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO review set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert review by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    //EVALUATION
    
    this.getEvaluation = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM evaluation',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluations.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getEvaluationById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM evaluation WHERE evaluation_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluation by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getEvaluationByIdUser = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM evaluation,evaluation_user,user,user_data WHERE evaluation_user.user_id = user.user_id AND evaluation_user.evaluation_id = evaluation.evaluation_id AND user.user_data_id = user_data.user_data_id AND evaluation.evaluation_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluation users by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getEvaluationByIdSection = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM evaluation,evaluation_section,section WHERE evaluation_section.section_id = section.section_id AND evaluation_section.evaluation_id = evaluation.evaluation_id AND evaluation.evaluation_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluation sections by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postEvaluation=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO evaluation set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert evaluation by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.updateEvaluation=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE evaluation set ? WHERE evaluation_id = ?",[data,data.evaluation_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update evaluation by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteEvaluationById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM evaluation_section WHERE evaluation_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain evaluation_section by id.');
                }
            })
            con.query('DELETE FROM evaluation_user WHERE evaluation_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain evaluation_user by id.');
                }
            })
            con.query('DELETE FROM evaluation WHERE evaluation_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain evaluation by id.');
                }
            })
            con.release();
            response.send('All content from evaluation was deleted');
        })
    }

    //SECTION
    
    this.getSection = function(response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM section',function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain sections.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getSectionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM section WHERE section_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain section by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.getSectionByIdQuestion = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('SELECT * FROM section,question_section,question WHERE question_section.section_id = section.section_id AND question_section.question_id = question.question_id AND section.section_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluation sections by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postSection=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO section set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert section by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.updateSection=function (data,response)
    {
        conection.obtain(function(e,con)
        {
            con.query("UPDATE section set ? WHERE section_id = ?",[data,data.section_id], function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to update section by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    
    this.deleteSectionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM evaluation_section WHERE section_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain evaluation_section by id.');
                }
            })
            con.query('DELETE FROM question_section WHERE section_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain question_section by id.');
                }
            })
            con.query('DELETE FROM section WHERE section_id =?',id,function(error,result)
            {
                if(error)
                {
                    response.send('Error at trying to obtain section by id.');
                }
            })
            con.release();
            response.send('All content from section was deleted');
        })
    }

    //RELATIONS

    this.postEvaluationSection=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO evaluation_section set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert evaluation_section by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteEvaluationSectionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM evaluation_section WHERE evaluation_section_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain evaluation_section by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postQuestionSection=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO question_section set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert question_section by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }

    this.deleteQuestionSectionById = function(id, response)
    {
        conection.obtain(function(e,con)
        {
            con.query('DELETE FROM question_section WHERE question_section_id =?',id,function(error,result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to obtain question_section by id.');
                }
                else
                {
                    response.send(result);
                }
            })
        })
    }

    this.postEvalUser=function (data, response)
    {
        conection.obtain(function(e,con)
        {
            con.query("INSERT INTO evaluation_user set ? ",data, function(error, result)
            {
                con.release();
                if(error)
                {
                    response.send('Error at trying to insert evaluation_user by id.');
                }
                else
                {
                    response.send("Estado: OK");
                }
            })
        })
    }
}

module.exports = new databaseMethods();