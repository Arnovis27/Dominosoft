const express= require("express");
const router= express.Router();
const userSchema= require("../model/user");

var global, global2;

//login usuarios 
router.get("/",(req,res)=>{
    res.render("Login");
});

router.post("/login",(req,res)=>{
    const { email ,password}  = req.body;
    userSchema.findOne({email,password}).then((data)=> {
        if (data != null){
            req.session.user= req.body.email;
            req.session.admin=data.admin;
            if(req.session.admin== true){
                global= req.session.admin;
                res.redirect("admin/home");
            }else{
                var camino= "empleado/"+req.body.email;
                res.redirect(camino);
            }
            
        }
    });
});

//cerrar session
router.get('/logout', function (req, res) {
    req.session.destroy();
    global=null;
    global2= null;
    res.redirect("/")
});

//registro para logear
router.get("/register",(req,res)=>{
    res.render("Registro")
});

router.post("/register/add",(req,res)=>{
    const user= userSchema(req.body);
    user.save().then(()=>{
        console.log("Usuario creado");
        res.redirect("/");
    }).catch((error)=> console.error(error));
});

//permisos admin
var autorizado= function(req, res, next) {
    if (global === true)
      return next();
    else
      return res.sendStatus(401);
};


//dashboard admin
router.get("/admin/home",autorizado,function(req,res){

    userSchema.find({},(err,data)=>{
        if(err) throw err;
            res.render("Home",{
                title: "LOGIN",
                tasks: data
            });
    });
});

//guardar empleado para admin
router.get("/create",autorizado,(req,res)=>{
    res.render("Create")
});

router.post("/create/admin",autorizado,(req,res)=>{
    let body= req.body;

    const user= userSchema(req.body);
    user.save().then(()=> {
        console.log("Empleado creado");
        res.redirect("/admin/home");
    }).catch((error)=>{
        console.log("No se puedo crear el empleado");
        res.redirect("/create");
    });
});

//actualizar empleado para admin
//seleccionar usuario
router.get("/update/:id",autorizado,(req,res)=>{
    let id= req.params.id;
    userSchema.findById(id, (error, data)=>{
        res.render("update",{
            title: "LOGIN",
            tasks: data
        });
    });
});

//actualizar usuario
router.post("/update/user/:id",autorizado,(req,res)=>{
    const  id = req.params.id;
    const {dui,first_name,last_name,email}= req.body;
    userSchema.findByIdAndUpdate(id,{dui,first_name,last_name,email}).then(()=>{
        res.redirect("/admin/home");
    }).catch((error)=> console.error(error));
});


//eliminar usuario
router.get("/delete/:id",autorizado,(req,res)=>{
    let id= req.params.id;
    userSchema.remove({_id: id},(error, data)=>{
        if (error) throw error;
        console.log("Eliminado");
        res.redirect("/admin/home");
    });
});

//home empleado
router.get("/empleado/:email",(req,res)=>{
    let mail= req.params.email;
    global2= mail;
    userSchema.find({email:mail},(err,data)=>{
        if(err) throw err;
            res.render("Empleado",{
                title: "LOGIN",
                datos: data
            });
        
    });
});

//seleccionar empleado y listar
router.get("/editar/:id",(req,res)=>{
    let id= req.params.id;
    userSchema.findById(id, (error, data)=>{
        res.render("Updateemp",{
            title: "LOGIN",
            tasks: data
        });
    });
});

//actualizar empleado
router.post("/actualizacion/:id",(req,res)=>{
    const  id = req.params.id;
    const camino2= "/empleado/"+global2;
    const {birthday,address,phone,vaccinate}= req.body;
    userSchema.findByIdAndUpdate(id,{birthday,address,phone,vaccinate}).then(()=>{
        res.redirect(camino2);
    }).catch((error)=> console.error(error));
});



module.exports= router;