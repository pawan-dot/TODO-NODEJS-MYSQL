var express= require('express');
var app=express();
app.get('/',function(req,res,next){
    req.getConnection(function(error,conn){
        conn.query("SELECT * FROM tbl_tasks ORDER BY id DESK",function(err,rows,fields){
            if(err){
                req.flash('error'.err)
                res.render('task/list', {
                    title:'Task list',
                    data:''
                })
            }
            else{
                res.render('task/list',{
                  title:'Task list',
                  data:rows  
                })
            }
        })
    })
})
app.get('/add',function(req,res,next){
    res.render('task/add',{
        title:'Add New Task',
        task_name:''
    })
})
app.post('/add',function(req,res,next){
    res.assert('task_name','Name is required').notEmpty()
    var errors=req.validationError()
        if(!error){
            var task={
                task_name:req.sanitize('task_name').escape().trim()
            }
            req.getConnection(function(error,conn){
                con.query("INSERT INTO tbl_task SET?",task,function(err,result){
                    if(err){
                        req.flash('error',err)
                        res.render('task/add',{
                            title:'Add New Task',
                            task_name:task.task_name
                        })
                    }
                    else{
                        req.flash('success','data Added successfuly!')
                        res.render('task/add',{
                            title:'Add New Task',
                            task_name: ''
                    })
                }

                })
            })

        }else{
            var error_msg=''
            error.forEach(function(erroe){
                err_msg +=error_msg + '</br>'
            })
          req.flash('error',err_msg)
          res.render('user/add',{
            title:'Add New Task',
            task_name:req.body.task_name

          })
        }
})
app.get('/edit/(:id)',function(req,res,next){
    req.getConnection(function(error,conn){
        conn.query("SELECT * FROM tbl_tasks WHERE id= " + 
       req.params.id, function(err,rows,fields){
           if(err) throw err;
           if(rows.lenght<=0){
               req.flash('error','User not found with id = '+ req.params.id)
               res.redirect('/tasks');
           }
           else
           {
               res.render('task/edit',{
                   title:'Edit Task',
                   id: rows[0].id,
                   task_name: rows[0].task_name
               });

           }
        })
    })
})
       app.put('/edit/(:id)',function(req,res,next){
           req.assert('task_name','Name is required').notEmpty()
           var err=req.validationErrors()
           if(!errors){
               var task={
                   //task_name=req.senitize('task_name').escape().trim()
                   task_name:req.sanitize('task_name').escape().trim()
               }
               req.getConnection(function(error,conn){
                   conn.query("UPDATE tbl_tasks SET ? WHERE id= " + req.param.id,task,
                   function(err,result){
                       if(err){
                           req.flash('error',err)
                           res.render('task/edit',{
                               title:'Edit Task',
                               id:req.params.id,
                               task_name:req.body.task_name
                           })
                       }else{
                           req.flash('success','Data updated successfully!')
                           res.render('task/edit',{
                           title:'Edit Task',
                               id:req.params.id,
                               task_name:req.body.task_name

                       })
                    }
                   })
               })
           }else{
            var error_msg=''
            error.forEach(function(erroe){
                err_msg +=error_msg + '</br>'
            })
          req.flash('error',err_msg)
          res.render('user/edit',{
            title:'Edit Task',
            id:req.params.id,
            task_name:req.body.task_name
          })
        }
       })

       app.delete('/delete/(:id)',function(req,res,next){
           var task={id:req.params.id}

           req.getConnection(function(error,conn){
            conn.query("DELETE FROM tbl_tasks SET ? WHERE id= " + req.param.id,user,
            function(err,result){
                if(err){
                    req.flash('error',err)
                    res.redirect('/tasks')
                }else{

                    req.flash('success','Data Deleted successfully!')
                    res.redirect('/tasks')
                }
            })
                })
       })
       module.exports=app;
        

    