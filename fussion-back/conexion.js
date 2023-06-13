const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://FussionFit:almendras14@cluster0.scpus1q.mongodb.net/?retryWrites=true&w=mayority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function conexionDB() {
  try {
    await client.connect();
    console.log('Conectado');
  } catch (error) {
    console.error('Error al conectar', error);
  }
}

async function findExercises(collection) {
  try {
    const db = client.db('FussionFit');
    const cursor = await db.collection(collection).find().toArray();
    console.log('Resultados de la búsqueda:', cursor);
    return cursor;
  } catch (error) {
    console.error('Error al buscar documentos', error);
  }
}

async function findExercisesQuery(collection, query) {
  try {
    const consulta = eval("({" + query + "})");
    console.log(consulta);
    const db = client.db('FussionFit');
    const cursor = await db.collection(collection).find(consulta).toArray();
    console.log('Resultados de la búsqueda:', cursor);
    return cursor;
  } catch (error) {
    console.error('Error al buscar documentos', error);
  }
}

async function updateExercise(collection, filter, update) {
  try {
    const db = client.db('FussionFit');
    const collectionToUpdate = db.collection(collection);

    const result = await collectionToUpdate.updateOne(filter, update, { writeConcern: { w: 'majority' } });
    
    console.log(result);

    if (result.modifiedCount === 1) {
      console.log('Documento actualizado correctamente');
    } else {
      console.log('No se encontró el documento o no se realizó ninguna modificación');
    }

    return { nombre: update.$set.nombre, apellidos: update.$set.apellidos,años: update.$set.años, premiun: update.$set.premiun,telefono: update.$set.telefono, direccion: update.$set.direccion, password: update.$set.password};
  } catch (error) {
    console.error('Error al actualizar el documento', error);
  }
}


async function insertUser(collection, user) {
  try {
    const db = client.db('FussionFit');
    const collectionToInsert = db.collection(collection);

    const result = await collectionToInsert.insertOne(user);

    if (result.insertedCount === 1) {
      console.log('Usuario insertado correctamente');

      // Obtener el ID de la dieta a partir de los datos del usuario
      const idDieta = user.idDieta;

      // Actualizar el campo correspondiente en la tabla "Usuarios Fission" con el ID de la dieta
      await collectionToInsert.updateOne(
        { correoElectronico: user.correoElectronico },
        { $set: { idDieta: idDieta } }
      );

      console.log('ID de dieta agregado correctamente al usuario');
    } else {
      console.log('Error al insertar el usuario');
    }

    return { nombre: user.nombre, apellidos: user.apellidos, años: user.años, premiun: user.premiun, telefono: user.telefono };
  } catch (error) {
    console.error('Error al insertar el usuario', error);
  }
}

async function insertFussion(collection, fission) {
  try {
    const db = client.db('FussionFit');
    const collectionToInsert = db.collection(collection);

    const result = await collectionToInsert.insertOne(fission);

    if (result.insertedCount === 1) {
      console.log('Usuario Fission insertado correctamente');

      console.log('ID de dieta agregado correctamente al usuario');
    } else {
      console.log('Error al insertar el usuario');
    }

    return {correoElectronico:fission.correoElectronico, nombre: fission.nombre, foto: fission.foto, dieta: fission.dieta, entrenador: fission.entrenador, usuario: fission.usuario, entrenamiento: fission.entrenamiento };
  } catch (error) {
    console.error('Error al insertar el usuario', error);
  }
}

async function insertPlan(collection,fussionPlan){
  try {
    const db = client.db('FussionFit');
    const collectionToInsert = db.collection(collection);
      console.log(fussionPlan);
    const result = await collectionToInsert.insertOne(fussionPlan,
      { writeConcern: { w: 1 } });

    if (result.insertedCount === 1) {
      console.log('Usuario Fission insertado correctamente');

      console.log('ID de dieta agregado correctamente al usuario');
    } else {
      console.log('Error al insertar el usuario');
    }

    return {result };
  } catch (error) {
    console.error('Error al insertar el usuario', error);
  }
}
async function insertPlanDia(){


}
async function  insertEjercicio(){


}

module.exports = {
  conexionDB,
  findExercises,
  findExercisesQuery,
  updateExercise,
  insertUser,
  insertFussion,
  insertPlan,
};


