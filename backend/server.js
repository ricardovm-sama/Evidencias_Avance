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
        unidades_disp integer NOT NULL,
        marca text,
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE
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
        peso_disp real NOT NULL,
        energia real,
        proteina real,
        grasa real,
        carbohidratos real,
        fibra real,
        colesterol real,
        sodio real,
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE
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
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE
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
        cantidad real NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY(idreceta) REFERENCES receta(id) ON DELETE CASCADE,
        FOREIGN KEY(idsubreceta) REFERENCES receta(id) ON DELETE CASCADE
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
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY(idreceta) REFERENCES receta(id) ON DELETE CASCADE,
        FOREIGN KEY(idingrediente) REFERENCES ingrediente(id) ON DELETE CASCADE
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
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY(idreceta) REFERENCES receta(id) ON DELETE CASCADE,
        FOREIGN KEY(idmaterialexterno) REFERENCES materialexterno(id) ON DELETE CASCADE
        )`;

    return  db.run(sqlQuery);
}

//Función que crea la tabla Temporada, en caso de que la tabla no exista.
const  createTemporadaTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS temporada (
        idingrediente integer NOT NULL,
        iduser integer NOT NULL,
        temp text NOT NULL,
        FOREIGN KEY(iduser) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY(idingrediente) REFERENCES ingrediente(id) ON DELETE CASCADE
        )`;

    return  db.run(sqlQuery);
}
// ################################################################################################################################
// --------------------------------------------------------------------------------------------------------------------------------
// ################################################################################################################################
// INSERTAR DATOS DE PRUEBA
//Usuarios
const insertUsuario1 = () => {
    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    db.run(insert, ['Aragox','ree@hhh.coo',bcrypt.hashSync('Mermela1.')])
    }

const insertUsuario2 = () => {
    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    db.run(insert, ['Mr Anderson','pez1@test.gol.do',bcrypt.hashSync('Sm1penult.')])
    }

//Materiales externos
const insertMaterialesExternos = () => {
    db.run(`INSERT INTO materialexterno (iduser,nombre,precio,unidades,unidades_disp,marca) 
    VALUES 
       (2,'Papel',800,1,6,'Soft'),
       (2,'Cuerda',200,3,8,"Aladino"),
       (1,'El Plato Fantástico',450,6,20,'Patito'),
       (1,'Servilleta',600,7,15,'Ventnor'),
       (1,'Lazo',300,4,5,'Lazlo');`);
    }

//Ingredientes
const insertIngredientes = () => {
    db.run(`INSERT INTO ingrediente (iduser,nombre,precio,peso,peso_disp,energia,proteina,grasa,carbohidratos,fibra,colesterol,sodio) 
    VALUES 
       (2,'Papa',400,58.40,560.62,50,2.50,0.36,6.21,3.21,0,0),
       (2,'Guayaba',200,61.90,425.80,60,1.35,0.15,10.49,1.23,0,0),
       (1,'Manzana',450,65.00,758.28,52,2.12,0.16,12.54,4.52,0,0),
       (1,'Fresa',200,20.23,127.05,28,1.12,0.09,5.50,2.82,0,0),
       (1,'Harina',600,1000.00,3500.02,300,58.32,6.48,25.10,8.11,2,1),
       (1,'Cereza',400,20.10,520.62,40,3.32,4.48,5.10,2.11,0,0);`);
    }

//Ingredientes
const insertRecetas = () => {
    db.run(`INSERT INTO receta (iduser,nombre) 
    VALUES 
       (2,'Pastel de Cereza'),
       (2,'Pie de Fresa'),
       (1,'Alfajor'),
       (1,'Queque 2 Pisos'),
       (1,'Queque'),
       (1,'Orden AlfQueque'),
       (1,'Pie de Manzana');`);
    }

//Receta_Receta
const insertReceta_Receta = () => {
    db.run(`INSERT INTO receta_receta (iduser,idreceta,idsubreceta,cantidad) 
    VALUES 
       (1,4,5,2.00),
       (1,6,5,0.50),
       (1,6,3,6.00);`);
    }

//Receta_Ingrediente
const insertReceta_Ingrediente = () => {
    db.run(`INSERT INTO receta_ingrediente (iduser,idreceta,idingrediente,peso) 
    VALUES 
       (1,3,5,9.00),
       (1,4,4,10.00),
       (1,5,5,150.00),
       (1,7,3,15.00),
       (1,7,5,40.00);`);
    }

//Receta_MaterialExterno
const insertReceta_MaterialExterno = () => {
    db.run(`INSERT INTO receta_materialexterno (iduser,idreceta,idmaterialexterno,unidades) 
    VALUES 
       (1,4,3,1),
       (1,5,4,2),
       (1,7,5,1);`);
    }

//Temporadas
const insertTemporadas = () => {
    db.run(`INSERT INTO temporada (iduser,idingrediente,temp) 
    VALUES 
       (1,3,'Enero'),
       (1,3,'Febrero'),
       (1,4,'Febrero'),
       (1,4,'Marzo'),
       (1,5,'Diciembre'),
       (1,5,'Marzo'),
       (1,6,'Enero'),
       (1,6,'Noviembre'),
       (1,6,'Junio'),
       (1,6,'Febrero');`);
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
createTemporadaTable();

// insertUsuario1(); // Hacer inserts
// insertUsuario2();
// insertMaterialesExternos(); 
// insertIngredientes();
// insertRecetas();   
// insertReceta_Receta();
// insertReceta_Ingrediente();
// insertReceta_MaterialExterno();
// insertTemporadas();
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
/*
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
        }*/
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
// Ruta que permite crear materiales externos
router.post("/api/materialexterno/crear", (req, res, next) => {
    const data = {
        iduser: req.body.id,
        nombre: req.body.form.nombre,
        precio: req.body.form.precio,
        unidades_disp: req.body.form.unidades_disp,
        unidades: req.body.form.unidades,
        marca: req.body.form.marca
    } 
    db.run(
        `INSERT INTO materialexterno (nombre, precio, unidades_disp, unidades, marca, iduser) VALUES (?,?,?,?,?,?)`, 
        [data.nombre, data.precio, data.unidades_disp, data.unidades, data.marca, data.iduser],
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
// Ruta para eliminar un material externo. Recibe el id del ítem a eliminar.
router.get("/api/materialexterno/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM materialexterno WHERE id = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});

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
// Ruta que permite modificar todos los datos de un material externo
router.get("/api/materialexterno/mod/:id/:nombre/:precio/:unidades_disp/:unidades/:marca", (req, res, next) => {
const data = {
        nombre: req.params.nombre,
        precio: req.params.precio,
        unidades_disp: req.params.unidades_disp,
        unidades: req.params.unidades,
        marca: req.params.marca
    } 
    db.run(
        `UPDATE materialexterno set
           nombre = ?, 
           precio = ?, 
           unidades_disp = ?, 
           unidades = ?,
           marca = ?
           WHERE id = ?`,
        [data.nombre, data.precio, data.unidades_disp, data.unidades, data.marca, req.params.id],
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
// --------------------------------------------------------------------------------------------------------------------------------
//INGREDIENTES
// --------------------------------------------------------------------------------------------------------------------------------
// Ruta que permite crear ingredientes
router.post("/api/ingrediente/crear", (req, res, next) => {
    const data = {
        iduser: req.body.id,
        nombre: req.body.form.nombre,
        precio: req.body.form.precio,
        peso_disp: req.body.form.peso_disp,
        peso: req.body.form.peso,
        energia: req.body.form.energia,
        proteina: req.body.form.proteina,
        grasa: req.body.form.grasa,
        carbohidratos: req.body.form.carbohidratos,
        fibra: req.body.form.fibra,
        colesterol: req.body.form.colesterol,
        sodio: req.body.form.sodio
    } 
    db.run(
        `INSERT INTO ingrediente (iduser, nombre, precio, peso_disp, peso, energia, proteina, grasa, carbohidratos, fibra, colesterol, sodio) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, 
        [data.iduser, data.nombre, data.precio, data.peso_disp, data.peso, data.energia, data.proteina, data.grasa, data.carbohidratos,
            data.fibra, data.colesterol, data.sodio],
        (err, result) => {
            if (err){
                res.status(400).json({"error":err.message});
                return;
            }
    });
    var sql = "SELECT last_insert_rowid()"
    var params = []
    db.get(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":result
        })
    });   
}) 

// Ruta para eliminar un ingrediente. Recibe el id del ítem a eliminar.
router.get("/api/ingrediente/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM ingrediente WHERE id = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});

router.get("/api/ingredientes/:id", (req, res, next) => {
    var sql = "select * from ingrediente where iduser = ? ORDER BY nombre ASC, peso ASC"
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

router.get("/api/ingrediente/:id", (req, res, next) => {
    var sql = "select * from ingrediente WHERE id = ?"
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
// Ruta para modificar un ingrediente.
router.post("/api/ingrediente/mod/", (req, res, next) => {
const data = {
        idingrediente: req.body.id,
        nombre: req.body.nombre,
        precio: req.body.precio,
        peso_disp: req.body.peso_disp,
        peso: req.body.peso,
        energia: req.body.energia,
        proteina: req.body.proteina,
        grasa: req.body.grasa,
        carbohidratos: req.body.carbohidratos,
        fibra: req.body.fibra,
        colesterol: req.body.colesterol,
        sodio: req.body.sodio
    } 
    db.run(
        `UPDATE ingrediente set
           nombre = ?, 
           precio = ?,
           peso_disp = ?, 
           peso = ?, 
           energia = ?,
           proteina = ?,
           grasa = ?,
           carbohidratos = ?,
           fibra = ?,
           colesterol = ?,
           sodio = ?
           WHERE id = ?`,
        [data.nombre, data.precio, data.peso_disp, data.peso, data.energia, data.proteina, data.grasa, data.carbohidratos,
            data.fibra, data.colesterol, data.sodio, data.idingrediente],
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

});
// --------------------------------------------------------------------------------------------------------------------------------
//RECETAS
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/recetas/:id", (req, res, next) => {
    var sql = "select * from receta where iduser = ? ORDER BY nombre ASC, id ASC"
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

router.get("/api/receta/:id", (req, res, next) => {
    var sql = "select * from receta WHERE id = ?"
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

// Ruta para crear una receta.
router.get("/api/receta/crear/:id/:nom", (req, res, next) => {
    var params = [req.params.id, req.params.nom]
    db.run(
        `INSERT INTO receta (iduser, nombre) VALUES (?,?)`,
        params,
        (err, result) => {
            if (err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message": "success",
                "data": req.params.nom
            })
    });
});

// Ruta para modificar el nombre de una receta.
router.get("/api/receta/mod/:id/:nom", (req, res, next) => {
    var params = [req.params.nom, req.params.id]
    db.run(
        `UPDATE receta set
           nombre = ? 
           WHERE id = ?`,
        params,
        (err, result) => {
            if (err){
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message": "success",
                "data": req.params.nom
            })
    });
});

// Ruta para eliminar una receta. Recibe el id del ítem a eliminar.
router.get("/api/receta/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM receta WHERE id = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});
// --------------------------------------------------------------------------------------------------------------------------------
//RECETA_RECETA
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/recetas_recetas/:id", (req, res, next) => {
    var sql = "select * from receta_receta where iduser = ? ORDER BY cantidad ASC, idreceta ASC"
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

router.get("/api/receta_recetas/:id/:idreceta", (req, res, next) => {
    var sql = "select * from receta_receta where iduser = ? and idreceta = ? ORDER BY cantidad ASC, idreceta ASC"
    var params = [req.params.id, req.params.idreceta]
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

router.get("/api/receta_receta/:id/:idreceta/:idsubreceta", (req, res, next) => {
    var sql = "select * from receta_receta WHERE iduser = ? and idreceta = ? and idsubreceta = ?"
    var params = [req.params.id, req.params.idreceta, req.params.idsubreceta]
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

// Ruta que permite insertar/crear las entradas para una receta
router.post("/api/receta_receta/crear", (req, res, next) => {
    const data = {
        array: req.body.arrayrct
    }
    data.array.forEach(elem => {
            console.log('Se intenta insertar la subreceta: ', elem.nombre, 'cantidad: ', elem.cantidad);
            db.run(
                `INSERT INTO receta_receta (idreceta, idsubreceta, iduser, cantidad) VALUES (?,?,?,?)`,
               [elem.idreceta, elem.idsubreceta, elem.iduser, elem.cantidad],
               (err, result) => {
                  if (err){
                     console.log('FRACASO al insertar la subreceta: ', elem.nombre);
                     res.status(400).json({"error":err.message});
                     return;
                 }
            });
            console.log('Se insertó la subreceta: ', elem.nombre);
    });
    console.log('EXITO');
    res.json({
             "message": "success",
             "data": data
    })                
}) 

// Ruta para eliminar las entradas con recetaid. Recibe el id del ítem a eliminar.
router.get("/api/receta_receta/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM receta_receta WHERE idreceta = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});

// --------------------------------------------------------------------------------------------------------------------------------
//RECETA_INGREDIENTE
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/recetas_ingredientes/:id", (req, res, next) => {
    var sql = "select * from receta_ingrediente where iduser = ? ORDER BY peso ASC, idreceta ASC"
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

router.get("/api/receta_ingredientes/:id/:idreceta", (req, res, next) => {
    var sql = "select * from receta_ingrediente where iduser = ? and idreceta = ? ORDER BY peso ASC, idreceta ASC"
    var params = [req.params.id, req.params.idreceta]
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

router.get("/api/receta_ingrediente/:id/:idreceta/:idingrediente", (req, res, next) => {
    var sql = "select * from receta_ingrediente WHERE iduser = ? and idreceta = ? and idingrediente = ?"
    var params = [req.params.id, req.params.idreceta, req.params.idingrediente]
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

// Ruta que permite insertar/crear las entradas para una receta
router.post("/api/receta_ingrediente/crear", (req, res, next) => {
    const data = {
        array: req.body.arraying
    }
    data.array.forEach(elem => {
            console.log('Se intenta insertar el ingrediente: ', elem.nombre, 'peso: ', elem.peso);
            db.run(
                `INSERT INTO receta_ingrediente (idreceta, idingrediente, iduser, peso) VALUES (?,?,?,?)`,
               [elem.idreceta, elem.idingrediente, elem.iduser, elem.peso],
               (err, result) => {
                  if (err){
                     console.log('FRACASO al insertar el ingrediente: ', elem.nombre);
                     res.status(400).json({"error":err.message});
                     return;
                 }
            });
            console.log('Se insertó el ingrediente: ', elem.nombre);
    });
    console.log('EXITO');
    res.json({
             "message": "success",
             "data": data
    })                
}) 

// Ruta para eliminar las entradas con recetaid. Recibe el id del ítem a eliminar.
router.get("/api/receta_ingrediente/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM receta_ingrediente WHERE idreceta = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});

// --------------------------------------------------------------------------------------------------------------------------------
//RECETA_MATERIAL EXTERNO
// --------------------------------------------------------------------------------------------------------------------------------
router.get("/api/recetas_materialesexternos/:id", (req, res, next) => {
    var sql = "select * from receta_materialexterno where iduser = ? ORDER BY unidades ASC, idreceta ASC"
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

router.get("/api/receta_materialesexternos/:id/:idreceta", (req, res, next) => {
    var sql = "select * from receta_materialexterno where iduser = ? and idreceta = ? ORDER BY unidades ASC, idreceta ASC"
    var params = [req.params.id, req.params.idreceta]
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

router.get("/api/receta_materialexterno/:id/:idreceta/:idmaterialexterno", (req, res, next) => {
    var sql = "select * from receta_materialexterno WHERE iduser = ? and idreceta = ? and idmaterialexterno = ?"
    var params = [req.params.id, req.params.idreceta, req.params.idmaterialexterno]
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

// Ruta que permite insertar/crear las entradas para una receta
router.post("/api/receta_materialexterno/crear", (req, res, next) => {
    const data = {
        array: req.body.arraymte
    }
    data.array.forEach(elem => {
            console.log('Se intenta insertar el materialexterno: ', elem.nombre, 'unidades: ', elem.unidades);
            db.run(
                `INSERT INTO receta_materialexterno (idreceta, idmaterialexterno, iduser, unidades) VALUES (?,?,?,?)`,
               [elem.idreceta, elem.idmaterialexterno, elem.iduser, elem.unidades],
               (err, result) => {
                  if (err){
                     console.log('FRACASO al insertar el materialexterno: ', elem.nombre);
                     res.status(400).json({"error":err.message});
                     return;
                 }
            });
            console.log('Se insertó el materialexterno: ', elem.nombre);
    });
    console.log('EXITO');
    res.json({
             "message": "success",
             "data": data
    })                
}) 

// Ruta para eliminar las entradas con recetaid. Recibe el id del ítem a eliminar.
router.get("/api/receta_materialexterno/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM receta_materialexterno WHERE idreceta = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data": params[0]
        })
      });
});
// --------------------------------------------------------------------------------------------------------------------------------
//INGREDIENTE_TEMPORADA
// --------------------------------------------------------------------------------------------------------------------------------
// Ruta para obtener las temporadas de todos los ingredientes del usuario
router.get("/api/temporadas/:id", (req, res, next) => {
    var sql = "select * from temporada where iduser = ? ORDER BY temp ASC, idingrediente ASC"
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

// Ruta para obtener las temporadas de 1 ingrediente del usuario
router.get("/api/temporadas/ingrediente/:id", (req, res, next) => {
    var sql = "select * from temporada where idingrediente = ? ORDER BY temp ASC, idingrediente ASC"
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

// Ruta que permite insertar/crear las temporadas de un ingrediente
router.post("/api/temporadas/crear", (req, res, next) => {
    const data = {
        array: req.body.array,
   //     idingrediente: req.body.idingrediente['last_insert_rowid()'],
        idingrediente: req.body.idingrediente,
        iduser: req.body.id
    }
    data.array.forEach(elem => {
        if (elem.selected === true) { // Insertar sólo si se seleccionó el mes
            console.log('Se intenta insertar el mes: ', elem.nombre, 'idingrediente: ', data.idingrediente, 'iduser: ', data.iduser);
            db.run(
                `INSERT INTO temporada (idingrediente, iduser, temp) VALUES (?,?,?)`,
               [data.idingrediente, data.iduser, elem.nombre],
               (err, result) => {
                  if (err){
                     console.log('FRACASO al insertar el mes: ', elem.nombre);
                     res.status(400).json({"error":err.message});
                     return;
                 }
            });
            console.log('Se insertó el mes: ', elem.nombre);
        }
    });
    console.log('EXITO');
    res.json({
             "message": "success",
             "data": data
    })                
}) 

// Ruta que permite eliminar las temporadas de un ingrediente
router.get("/api/temporadas/elim/:id", (req, res, next) => {
    var sql = "DELETE FROM temporada WHERE idingrediente = ?"
    var params = [req.params.id]
    db.run(sql, params, (err, result) => {
        if (err) {
          console.log('FRACASO en proceso de eliminado');
          res.status(400).json({"error":err.message});
          return;
        }
        console.log('Proceso de eliminado exitoso!');
        res.json({
            "message":"success",
            "data": req.params.id
        })
      });
}) 
// --------------------------------------------------------------------------------------------------------------------------------
//FUNCIÓN REALIZAR. AGREGAR Y DESECHAR INGREDIENTES Y/O MATERIALES EXTERNOS
// --------------------------------------------------------------------------------------------------------------------------------
// Ruta que permite agregar o desechar los items de la funcionalidad realizar.
router.post("/api/realizar/", (req, res, next) => {
        const data = {
            array: req.body
        }
        data.array.forEach(elem => {
            if (elem.tipo === 2) {
                db.run(
                    `UPDATE ingrediente set 
                       peso_disp = ? 
                       WHERE id = ?`,
                    [elem.valor, elem.iditem],
                    (err, result) => {
                        if (err){
                            res.status(400).json({"error":err.message});
                            return;
                        }
                });
            }
            if (elem.tipo === 3) {
                db.run(
                    `UPDATE materialexterno set 
                       unidades_disp = ? 
                       WHERE id = ?`,
                    [elem.valor, elem.iditem],
                    (err, result) => {
                        if (err){
                            res.status(400).json({"error":err.message});
                            return;
                        }
                });
            } 
        });
        res.json({
                 "message": "success",
                 "data": data
        })        
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