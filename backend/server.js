// "use strict";
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken'); // Módulo para crear tokens JSON
const  bcrypt  =  require('bcryptjs'); // Módulo para encriptar los passwords antes de guardarlos en la bd

const SECRET_KEY = 'skapptokens0.1'; // Llave secreta para firmar los payloads para la creación de tokens JSON

const app = express()
const  router  =  express.Router();
app.use(cors());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = new sqlite3.Database("./my.db"); // Crear base de datos
db.run('PRAGMA foreign_keys = ON'); // Activar restricciones de llaves foráneas

// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// CREAR TABLAS
//Función que crea la tabla Usuarios, en caso de que la tabla no exista.
const  createUserTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL,
        email text UNIQUE NOT NULL,
        password text NOT NULL
        )`;
        
    return  db.run(sqlQuery);
}

//Función que crea la tabla Material Externo, en caso de que la tabla no exista.
const  createMaterialExternoTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS materialexterno (
        id integer PRIMARY KEY AUTOINCREMENT,
        iduser integer NOT NULL,
        nombre text NOT NULL,
        precio integer NOT NULL,
        unidades integer NOT NULL,
        peso real,
        marca text,
        FOREIGN KEY(iduser) REFERENCES user(id)
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Ingrediente, en caso de que la tabla no exista.
const  createIngredienteTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS ingrediente (
        id integer PRIMARY KEY AUTOINCREMENT,
        iduser integer NOT NULL,
        nombre text NOT NULL,
        precio integer NOT NULL,
        peso real NOT NULL,
        energia integer,
        proteina real,
        grasa real,
        carbohidratos real,
        fibra real,
        colesterol integer,
        sodio integer,
        FOREIGN KEY(iduser) REFERENCES user(id)
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Receta, en caso de que la tabla no exista.
const  createRecetaTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS receta (
        id integer PRIMARY KEY AUTOINCREMENT,
        iduser integer NOT NULL,
        nombre text NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id)
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Receta_Receta, en caso de que la tabla no exista.
const  createReceta_RecetaTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS receta_receta (
        idreceta integer NOT NULL,
        idsubreceta integer NOT NULL,
        iduser integer NOT NULL,
        unidades integer NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id),
        FOREIGN KEY(idreceta) REFERENCES receta(id),
        FOREIGN KEY(idsubreceta) REFERENCES receta(id)
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Receta_Ingrediente, en caso de que la tabla no exista.
const  createReceta_IngredienteTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS receta_ingrediente (
        idreceta integer NOT NULL,
        idingrediente integer NOT NULL,
        iduser integer NOT NULL,
        peso real NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id),
        FOREIGN KEY(idreceta) REFERENCES receta(id),
        FOREIGN KEY(idingrediente) REFERENCES ingrediente(id)
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Receta_MaterialExterno, en caso de que la tabla no exista.
const  createReceta_MaterialExternoTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS receta_materialexterno (
        idreceta integer NOT NULL,
        idmaterialexterno integer NOT NULL,
        iduser integer NOT NULL,
        unidades integer NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id),
        FOREIGN KEY(idreceta) REFERENCES receta(id),
        FOREIGN KEY(idmaterialexterno) REFERENCES materialexterno(id)
        )`;

    return  db.run(sqlQuery);
}
// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// INSERTAR DATOS DE PRUEBA
//Usuarios
const insertUsuarios = () => {
    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    db.run(insert, ['Mr Anderson','pez1@test.gol.do',bcrypt.hashSync('Sm1penult.')])
    db.run(insert, ['Aragox','ree@hhh.coo',bcrypt.hashSync('Mermela1.')])
    }

//Materiales externos
const insertMaterialesExternos = () => {
    db.run(`INSERT INTO materialexterno (iduser,nombre,precio,unidades,peso,marca) 
    VALUES 
       (1,'Papel',800,1,10.00,'Soft'),
       (1,'Cuerda',200,3,15.60,"Aladino"),
       (2,'Lazo',450,6,6.70,'Guntera'),
       (2,'Pirotines',600,7,9.50,'Ventnor');`);
    }
// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// INICIALIZAR BASE DE DATOS
createUserTable(); // Crear tablas
createMaterialExternoTable();
createIngredienteTable();
createRecetaTable();
createReceta_RecetaTable();
createReceta_IngredienteTable();
createReceta_MaterialExternoTable();

// insertUsuarios(); // Hacer inserts
// insertMaterialesExternos();    
// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// FUNCIONES AUXILIARES
// Función que busca un usuario por email. Retorna el usuario
const  findUserByEmail  = (email, cb) => {
    return  db.get(`SELECT * FROM user WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}

// Función que crea un usuario en la bd.
const  createUser  = (user, cb) => {
    return  db.run('INSERT INTO user (name, email, password) VALUES (?,?,?)',user, (err) => {
        cb(err)
    });
}

const  findMaterialExternoByID  = (id, cb) => {
    return  db.get(`SELECT * FROM user WHERE id = ?`,[id], (err, row) => {
            cb(err, row)
    });
}

const moficarMEById = (id, material, result) => {
    return db.run(
            `UPDATE materialexterno set
            nombre = ?, 
            precio = ?, 
            peso = ?, 
            unidades = ?,
            marca = ?
            WHERE id = ?`, [material.nombre, material.precio, material.peso, material.unidades, material.marca, id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                  }
            
                  if (res.affectedRows == 0) {
                    // not found Customer with the id
                    result({ kind: "not_found" }, null);
                    return;
                  }
            
                  console.log("updated ME: ", { id: id, ...customer });
                  result(null, { id: id, ...customer });
            });
        }
// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// DATA ENDPOINTS
// Root path
router.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
// --------------------------------------------------------------------------------------------------------------------------------
//USUARIOS
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


router.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

/*
app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
*/

router.post('/api/user/', (req, res, next) => { // Crear/Registrar un usuario

    const  name  =  req.body.name; // Extraer datos de usuario
    const  email  =  req.body.email;
    const  password  =  bcrypt.hashSync(req.body.password); 

    createUser([name, email, password], (err)=>{ // Se crea el usuario

        if(err) return  res.status(500).send('Error de servidor!'); // Si ocurre un error, retornar mensaje de error

        findUserByEmail(email, (err, user)=>{ // Buscar usuario creado

            if (err) return  res.status(500).send('Error de servidor!');  // Si ocurre un error, retornar mensaje de error 

            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, { // Se generan los tokens de acceso (a partir del id obtenido)
                expiresIn:  expiresIn
            });
            res.status(200).send({ 'user':  user, 'access_token':  accessToken, 'expires_in':  expiresIn          
            });
        });
    });
});


router.post('/api/user/login', (req, res) => { // Iniciar Sesión Usuario

    const  email  =  req.body.email; // Extraer datos de usuario
    const  password  =  req.body.password;

    findUserByEmail(email, (err, user)=>{ // Buscar usuario

        if (err) return  res.status(500).send('Error de servidor!'); // Si ocurre un error, retornar mensaje de error

        if (!user) return  res.status(404).send('Usuario no encontrado!');

        const  result  =  bcrypt.compareSync(password, user.password); // Comparar password con el de la bd

        if(!result) return  res.status(401).send('Contraseña incorrecta!'); 

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, { // Se generan los tokens de acceso
            expiresIn:  expiresIn
        });
        res.status(200).send({ 'user':  user, 'access_token':  accessToken, 'expires_in':  expiresIn});
    });
});


router.delete("/api/user/:id", (req, res, next) => { // Borrar Usuario
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

// --------------------------------------------------------------------------------------------------------------------------------
//MATERIALES EXTERNOS
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/materialesexternos/:id", (req, res, next) => {
    var sql = "select * from materialexterno where iduser = ? ORDER BY nombre ASC, unidades ASC"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/api/materialexterno/:id", (req, res, next) => {
    var sql = "select * from materialexterno WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

/*router.put('/api/materialexterno/mod/:id', (req, res) => { // Modificar Material Externo


  const data = {
        nombre: 'Azula',
        precio: 6000,
        peso: '76.1',
        unidades: 2,
        marca: 'China'
    }
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 

  moficarMEById(
    req.params.id,
    data,
    (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ME with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ME with id " + req.params.id
          });
        }
      } else res.send(result);
    }
  );
});
*/

router.get("/api/materialexterno/mod/:id/:nombre/:precio/:peso/:unidades/:marca", (req, res, next) => {
const data = {
        nombre: req.params.nombre,
        precio: req.params.precio,
        peso: req.params.peso,
        unidades: req.params.unidades,
        marca: req.params.marca
    } 
    db.run(
        `UPDATE materialexterno set
           nombre = ?, 
           precio = ?, 
           peso = ?, 
           unidades = ?,
           marca = ?
           WHERE id = ?`,
        [data.nombre, data.precio, data.peso, data.unidades, data.marca, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message": "success",
                "data": data
            })
    });

})

// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// PUERTO SERVIDOR
app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 