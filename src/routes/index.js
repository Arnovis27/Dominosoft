const express= require("express");
const router= express.Router();
const userSchema= require("../model/user");
const datosSchema= require("../model/datos");

//login usuarios 
router.get("/",(req,res)=>{
    res.render("Login");
});

router.post("/login",(req,res)=>{
    const { email ,password}  = req.body;
    userSchema.findOne({email,password}).then((data)=> {
        if (data != null){
            res.redirect("admin/home")
        }
    });
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

//dashboard admin
router.get("/admin/home",(req,res)=>{

    datosSchema.find({},(err,data)=>{
        if(err) throw err;
            res.render("Home",{
                title: "LOGIN",
                tasks: data
            });
    });
});

//guardar empleado para admin
router.get("/create",(req,res)=>{
    res.render("Create")
});

router.post("/create/admin",(req,res)=>{
    let body= req.body;
    console.log(body);

    const user= datosSchema(req.body);
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
router.get("/update/:id",(req,res)=>{
    let id= req.params.id;
    datosSchema.findById(id, (error, data)=>{
        res.render("update",{
            title: "LOGIN",
            tasks: data
        });
    });
});

//actualizar usuario
router.post("/update/user/:id",(req,res)=>{
    const  id = req.params.id;
    const {dui,first_name,last_name,email}= req.body;
    datosSchema.findByIdAndUpdate(id,{dui,first_name,last_name,email}).then(()=>{
        res.redirect("/admin/home");
    }).catch((error)=> console.error(error));
});


//eliminar usuario
router.get("/delete/:id",(req,res,next)=>{
    let id= req.params.id;
    datosSchema.remove({_id: id},(error, data)=>{
        if (error) throw error;
        console.log("Eliminado");
        res.redirect("/admin/home");
    });
});

module.exports= router;