const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); // paquete que se installa para desbloquear la comunicacion fomulario y server
                               // nmp install cors 


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user:"usuario",
    password: "123456",
    database: "empleados_crud"

});

//crear nuevo empleado
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    //if(req.body.edad==null){edad=0;}    

    const pais = req.body.pais;
    const cargo = req.body.cargo;
    
    const anios = req.body.anios;
    //if(req.body.anios==null){anios=0;}    
    
    

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                //res.send("Empleado registrado con exito!!");
                res.send(result);
            }
        }
     );
});

// para listar los empleados
app.get("/empleados",(req,res)=>{ 
    
    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
     );
});

//actualizar empleados
app.put("/update",(req,res)=>{ 
    
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                //res.send("Empleado Actualizado con exito!!");
                res.send(result);
            }
        }
     );
});


app.delete("/delete/:id",(req,res)=>{ 
    const id = req.params.id;
    //const id = req.body.id;    

    db.query('DELETE FROM empleados WHERE id=?',[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
     );
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");
});