var db = require('./queries');

function http()
{
    this.configure = function(app)
    {
        app.get('/userlogin/:id',function(request,response)
        {
            db.getUserLoginById(request.params.id,response);
        })

        app.post('/userlogin/',function(request,response)
        {
            db.postUserLogin(request.body, response);
        })  

        app.put('/userlogin/',function(request,response)
        {
            db.updateUserLogin(request.body, response);
        }) 

        app.get('/user/',function(request,response)
        {
            db.getUser(response);
        })

        app.get('/user/:id',function(request,response)
        {
            db.getUserById(request.params.id,response);
        })

        app.post('/user/',function(request,response)
        {
            db.postCompleteUser(request.body, response);
        })       
        
        app.put('/user/',function(request,response)
        {
            db.updateUserData(request.body, response);
        })    

        app.delete('/user/:id',function(request,response)
        {
            db.deleteUserById(request.params.id,response);
        })

        app.get('/admin/',function(request,response)
        {
            db.getAdmin(response);
        })

        app.get('/admin/:id',function(request,response)
        {
            db.getAdminById(request.params.id,response);
        })

        app.post('/admin/',function(request,response)
        {
            db.postAdmin(request.body, response);
        })

        app.delete('/admin/:id',function(request,response)
        {
            db.deleteAdminById(request.params.id,response);
        })

        app.get('/teacher/',function(request,response)
        {
            db.getTeacher(response);
        })

        app.get('/teacher/:id',function(request,response)
        {
            db.getTeacherById(request.params.id,response);
        })

        app.post('/teacher/',function(request,response)
        {
            db.postTeacher(request.body, response);
        })

        app.delete('/teacher/:id',function(request,response)
        {
            db.deleteTeacherById(request.params.id,response);
        })

        app.get('/student/',function(request,response)
        {
            db.getStudent(response);
        })

        app.get('/student/:id',function(request,response)
        {
            db.getStudentById(request.params.id,response);
        })

        app.post('/student/',function(request,response)
        {
            db.postStudent(request.body, response);
        })

        app.delete('/student/:id',function(request,response)
        {
            db.deleteStudentById(request.params.id,response);
        })

        app.get('/question/',function(request,response)
        {
            db.getQuestion(response);
        })

        app.get('/question/:id',function(request,response)
        {
            db.getQuestionById(request.params.id,response);
        })

        app.get('/question/:id/rubric',function(request,response)
        {
            db.getQuestionByIdRubric(request.params.id,response);
        })

        app.get('/question/:id/answer',function(request,response)
        {
            db.getQuestionByIdAnswer(request.params.id,response);
        })

        app.post('/question/',function(request,response)
        {
            db.postQuestion(request.body, response);
        })

        app.put('/question/',function(request,response)
        {
            db.updateQuestion(request.body, response);
        })  

        app.delete('/question/:id',function(request,response)
        {
            db.deleteQuestionById(request.params.id,response);
        })

        app.get('/rubric/',function(request,response)
        {
            db.getRubric(response);
        })

        app.get('/rubric/:id',function(request,response)
        {
            db.getRubricById(request.params.id,response);
        })

        app.post('/rubric/',function(request,response)
        {
            db.postRubric(request.body, response);
        })

        app.put('/rubric/',function(request,response)
        {
            db.updateRubric(request.body, response);
        })  

        app.delete('/rubric/:id',function(request,response)
        {
            db.deleteRubricById(request.params.id,response);
        })

        app.get('/answer/',function(request,response)
        {
            db.getAnswer(response);
        })

        app.get('/answer/:id',function(request,response)
        {
            db.getAnswerById(request.params.id,response);
        })

        app.get('/answer/:id/review',function(request,response)
        {
            db.getAnswerByIdReview(request.params.id,response);
        })

        app.post('/answer/',function(request,response)
        {
            db.postAnswer(request.body, response);
        })

        app.get('/review/',function(request,response)
        {
            db.getReview(response);
        })

        app.get('/review/:id',function(request,response)
        {
            db.getReviewById(request.params.id,response);
        })

        app.post('/review/',function(request,response)
        {
            db.postReview(request.body, response);
        })

        app.get('/evaluation/',function(request,response)
        {
            db.getEvaluation(response);
        })

        app.get('/evaluation/:id',function(request,response)
        {
            db.getEvaluationById(request.params.id,response);
        })

        app.get('/evaluation/:id/user',function(request,response)
        {
            db.getEvaluationByIdUser(request.params.id,response);
        })

        app.get('/evaluation/:id/section',function(request,response)
        {
            db.getEvaluationByIdSection(request.params.id,response);
        })

        app.post('/evaluation/',function(request,response)
        {
            db.postEvaluation(request.body, response);
        })

        app.put('/evaluation/',function(request,response)
        {
            db.updateEvaluation(request.body, response);
        })  

        app.delete('/evaluation/:id',function(request,response)
        {
            db.deleteEvaluationById(request.params.id,response);
        })

        app.get('/section/',function(request,response)
        {
            db.getSection(response);
        })

        app.get('/section/:id',function(request,response)
        {
            db.getSectionById(request.params.id,response);
        })

        app.get('/section/:id/question',function(request,response)
        {
            db.getSectionByIdQuestion(request.params.id,response);
        })

        app.post('/section/',function(request,response)
        {
            db.postSection(request.body, response);
        })

        app.put('/section/',function(request,response)
        {
            db.updateSection(request.body, response);
        })  

        app.delete('/section/:id',function(request,response)
        {
            db.deleteSectionById(request.params.id,response);
        })

        app.post('/evalsection/',function(request,response)
        {
            db.postEvaluationSection(request.body, response);
        })

        app.delete('/evalsection/:id',function(request,response)
        {
            db.deleteEvaluationSectionById(request.params.id,response);
        })

        app.post('/questsection/',function(request,response)
        {
            db.postQuestionSection(request.body, response);
        })

        app.delete('/questsection/:id',function(request,response)
        {
            db.deleteQuestionSectionById(request.params.id,response);
        })

        app.post('/evaluser/',function(request,response)
        {
            db.postEvalUser(request.body, response);
        })
    }
}

module.exports = new http();