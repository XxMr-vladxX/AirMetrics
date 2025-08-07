const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createPool({   //Los datos para la conexion con la DB
    host: '82.197.82.133',
    user: 'u670852162_admin',
    password: 'Airmetrics$1234',
    database: 'u670852162_airmetrics',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

db.getConnection(err => { //Realiza la conexion con la DB
    if (err){
        console.error('Error de conexión:',err);
    }else{
        console.log('Conectado a MySQL');
    }
});

// Consulta las credenciales ingresadas para ver si hay un usuario con estas
app.get('/api/login', (req, res) => {
    const correo=req.query.correo;
    const contrasena=req.query.contrasena;
    db.query(`CALL login(?,?)`, [correo, contrasena], (err, resultados) => {
        if (err){
            console.error('Error en la consulta:',err);
            res.status(500).json({error: 'Error en la base de datos'});
        }else{
            res.json(resultados);
        }
    });
});

// Inserta un nuevo usuario con los datos ingresados
app.post('/api/signup', (req, res) => {
    const {nombre, correo, contrasena}=req.body;
    db.getConnection((err, connection) => {
        if (err){
            console.error("Error de conexión:", err);
        }
        connection.query(`CALL crear_usuario(?,?,?)`, [nombre, correo, contrasena], (err, resultados) => {
            if (err){
                console.error("Error en la consulta:", err);
                return res.status(500).json({error: "Error en la base de datos"});
            }else{
                return res.json({creado: true});
            }
        });
    });
});

// Consulta la vista de medidas actuales
app.get('/api/current', (req, res) => {
    db.query(`SELECT * FROM medidas_actuales`, (err, resultados) => {
        if (err){
            console.error('Error en la consulta:',err);
            res.status(500).json({error: 'Error en la base de datos'});
        }else{
            res.json(resultados);
        }
    });
});

// Consulta la vista de niveles de co2 de las ultimas 24 horas para la grafica
app.get('/api/daily_graph', (req, res) => {
    db.query(`SELECT * FROM co2_diario ORDER BY fecha, hora`, (err, resultados) => {
        if (err){
            console.error('Error en la consulta:',err);
            res.status(500).json({error: 'Error en la base de datos'});
        }else{
            res.json(resultados);
        }
    });
});

// Consulta la vista de niveles de co2 de la ultima semana para la grafica
app.get('/api/weekly_graph', (req, res) => {
    db.query(`SELECT * FROM co2_semanal ORDER BY fecha LIMIT 7`, (err, resultados) => {
        if (err){
            console.error('Error en la consulta:',err);
            res.status(500).json({error: 'Error en la base de datos'});
        }else{
            res.json(resultados);
        }
    });
});

// Recupera los registros con niveles peligrosos de cierto mes para crear la lista del reporte
app.get('/api/report', (req,res) => {
    const mes=req.query.mes;
    db.query(`call reporte_mensual(?)`, [mes], (err, resultados) => {
        if (err){
            console.error('Error en la consulta:',err);
            res.status(500).json({error: 'Error en la base de datos'});
        }else{
            res.json(resultados);
        }
    });
});

app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:3001`);
});