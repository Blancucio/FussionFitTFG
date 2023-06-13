const express = require('express');
const cors = require('cors');
const { conexionDB, findExercises, findExercisesQuery, updateExercise,insertUser,insertFussion, insertPlan, insertPlanDia, insertEjercicio } = require('./conexion');
const { model } = require('mongoose');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Cabeceras de solicitud:', req.headers);
  next();
});

app.listen(3000, () => console.log('Iniciando servidor en el puerto 3000'));

app.get('/exercises/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const ejercicios = await findExercises(collection);
    res.send(ejercicios);
  } catch (error) {
    console.error('Error al obtener los ejercicios', error);
    res.status(500).json({ error: 'Error al obtener los ejercicios' });
  }
});

app.get('/exercises/:collection/:query', async (req, res) => {
  try {
    const { collection, query } = req.params;
    const ejercicios = await findExercisesQuery(collection, query);
    res.send(ejercicios);
  } catch (error) {
    console.error('Error al obtener los ejercicios', error);
    res.status(500).json({ error: 'Error al obtener los ejercicios' });
  }
});

app.patch('/exercises/:collection/:correoElectronico', async (req, res) => {
  try {
    const { collection, correoElectronico } = req.params;
    const { nombre, apellidos, direccion, años, premiun, telefono, password } = req.body;

    console.log('Colección:', collection);
    console.log('Correo Electrónico:', correoElectronico);

    const update = {};

    if (nombre) {
      update.nombre = nombre;
    }
    if (apellidos) {
      update.apellidos = apellidos;
    }
    if (direccion) {
      update.direccion = direccion;
    }
    if (años) {
      update.años = años;
    }
    if (premiun) {
      update.premiun = premiun;
    }
    if (telefono) {
      update.telefono = telefono;
    }
    if (password) {
      update.password = password;
    }

    console.log('Campo de actualización: nombre');
    console.log('Valor de actualización:', update.nombre);
    console.log('Campo de actualización: apellidos');
    console.log('Valor de actualización:', update.apellidos);
    console.log('Campo de actualización: direccion');
    console.log('Valor de actualización:', update.direccion);
    console.log('Campo de actualización: años');
    console.log('Valor de actualización:', update.años);
    console.log('Campo de actualización: premiun');
    console.log('Valor de actualización:', update.premiun);
    console.log('Campo de actualización: telefono');
    console.log('Valor de actualización:', update.telefono);
    console.log('Campo de actualización: password');
    console.log('Valor de actualización:', update.password);

    const filter = { correoElectronico };
    const updateQuery = { $set: update };

    console.log('Update:', updateQuery);

    const result = await updateExercise(collection, filter, updateQuery);
    console.log(result);

    // Imprimir el JSON que se está enviando a la base de datos
    const jsonToSend = { nombre: result.nombre, apellidos: result.apellidos, direccion: result.direccion, años: result.años, premiun: result.premiun, telefono: result.telefono, password: result.password };
    console.log('JSON a enviar:', JSON.stringify(jsonToSend));

    res.send(jsonToSend);
  } catch (error) {
    console.error('Error al actualizar el documento', error);
    res.status(500).json({ error: 'Error al actualizar el documento' });
  }
});




app.post('/exercises/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { nombre, foto, dieta, entrenador, usuario, entrenamiento, apellidos, premiun, telefono, correoElectronico, años } = req.body;

    if (collection === 'UsuariosFission') {
      const fission = {
        correoElectronico,
        nombre,
        foto,
        dieta,
        entrenador,
        usuario,
        entrenamiento,
      };
      console.log(fission);
      const result = await insertFussion(collection, fission);
      res.send(result);
    } else {
      const user = {
        nombre,
        apellidos,
        premiun,
        telefono,
        correoElectronico,
        años,
      };
      const result = await insertUser(collection, user);
      res.send(result);
    }
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});

app.post('/insertPlan/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { nombre, duracion, descripcion} = req.body;

     
      const fussionPlan = {
        nombre,
        duracion,
        descripcion     
      };
      console.log(fussionPlan);
      const result = await insertPlan(collection, fussionPlan);
      res.send(result);
    
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});

app.post('/insertPlan/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { nombre, duracion, descripcion} = req.body;

     
      const fussionPlan = {
        nombre,
        duracion,
        descripcion     
      };
      console.log(fussionPlan);
      const result = await insertPlan(collection, fussionPlan);
      res.send(result);
    
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});
app.post('/insertPlanDia/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { nombre, planDia} = req.body;

     
      const fussionPlan = {
        nombre,
        planDia
            
      };
      console.log(fussionPlan);
      const result = await insertPlan(collection, fussionPlan);
      res.send(result);
    
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});
app.post('/insertEjercicio/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { nombre, repeticiones, series, peso} = req.body;

     
      const fussionPlan = {
        nombre,
        repeticiones,
        series,
        peso
            
      };
      console.log(fussionPlan);
      const result = await insertPlan(collection, fussionPlan);
      res.send(result);
    
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});


module.exports = router;