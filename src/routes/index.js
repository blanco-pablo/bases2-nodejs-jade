const {Router} = require('express');
const con = require('../database');
const db = require('../database');
const router = Router();
var buscar = 1;

var colores = ["Aqua","Black","Blue","brown","gold","green","magenta","orange","pink","Purple","Gray","red","yellow","Olive","chocolate","crimson","Navy"];      

router.get('/', function(req, res, next) {
    res.render('login', { error: false,si:"no"});
  });

router.get('/carga', function(req, res, next) {
    res.render('carga', { si:"si"});
});  

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const pass = req.body.password;
    console.log(username,pass)
    if(username==="admin@gmail.com" && pass==="admin"){
        res.redirect('/inicio');
    }
    else{
        res.send('f');
    }
});

router.get('/cuadro', function (req,res) {
    
    var tabla = [];
    var tabla2 = [];
    db.query('select id,nombre from bancos', (err,rows) => {
        for(var i in rows){
            tabla.push(rows[i].nombre);
        }
    });

    var q = 'select (a.activo/1000000) as activo,b.nombre,monthname(f.fecha) as fecha,year(f.fecha) as año from ActivoBanco as a, bancos as b, catFecha as f where a.idBanco=b.id and a.idgatoFecha=f.id and a.idBanco=';
    q = q + buscar;

    db.query(q, (err,rows) => {
        for(var i in rows){
            tabla2.push([rows[i].activo,rows[i].nombre,rows[i].fecha,rows[i].año]);
        }
        res.render('Cuadro', { error: false,si:"si",tabla:tabla,tabla2:tabla2});
    });    
});

router.get('/inicio', function (req,res) {
    let datasets = [];
    var fechas = [];
    db.query('select id,DATE_FORMAT(fecha,\'%d/%m/%Y\') AS fecha from proyecto.catFecha', (err,rows) => {
        for(var i in rows){
            fechas.push(rows[i].fecha);
        }
        db.query('select id,nombre,(activo/1000000) as activo from proyecto.bancos as b, ActivoBanco as a where b.id=a.idBanco;', (err,ban) => {
            let nombres = [];
            let actual = 1;
            let general = [];
            let datos = [];
            let x = 1;
            for(var i in ban){
                if(actual == ban[i].id) {
                    //GUARDO SOLO UN NOMBRE
                    nombres.push(ban[i].nombre);
                    actual = actual + 1; 
                    if (x == 0) {
                        general.push(datos);
                        datos = [];               
                    }
                    x = 0;
                }
                datos.push(ban[i].activo);  
            }
            general.push(datos);
            for(var s in nombres){
                var dataset = {
                    label: 'Banco',
                    fill: false,
                    lineTension: 0.1,
                    pointBackgroundColor: "white",
                    borderCapStyle: 'square',
                    data: [1, 2, 3, 10],
                    borderColor: "gray"
                };
                dataset.label = nombres[s];
                dataset.borderColor = colores[s];
                dataset.data = general[s];
                datasets.push(dataset);
            }
            console.log(datasets);
            res.render('index', { 
                error: false,si:"si",
                fechas:JSON.stringify(fechas),
                datasets:JSON.stringify(datasets)
            }); 
            // RECORRO POR BANCOS RECIRSvO
            //recursivo(fechas,ban,0,17,res); 
            
        });          
    });
    
    

    
});

function recursivo(fechas,rows,actual,fin,res) {
    if (actual == fin) {
        console.log(datasets);
             
        return 1;
    }
    else{
        var dataset = {
            label: 'Banco',
            fill: false,
            lineTension: 0.1,
            pointBackgroundColor: "white",
            borderCapStyle: 'square',
            data: [1, 2, 3, 10],
            borderColor: "gray"
        };
        dataset.borderColor = colores[actual];
        dataset.label = rows[actual].nombre;
        
        datasets.push(dataset);
        return recursivo(fechas,rows,actual+1,fin,res);
        
    }
}

router.post('/cuadro', function (req,res) {
    buscar = parseInt(req.body.ss)+1;
    res.redirect('/cuadro');
});


module.exports = router