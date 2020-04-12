const fs = require('fs');



let listaPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listaPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puedo grabar', err);
    });
}
const cargarDB = () => {
    try {
        listaPorHacer = require('../db/data.json');
    } catch (error) {
        listaPorHacer = [];
    }
}
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listaPorHacer.push(porHacer);
    guardarDB()
    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listaPorHacer
}

const actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listaPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listaPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listaPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (listaPorHacer.length === nuevoListado.length) {
        return false;
    }
    listaPorHacer = nuevoListado;
    guardarDB();
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}