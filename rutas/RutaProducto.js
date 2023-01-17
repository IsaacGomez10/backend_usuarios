import express from "express";
import {
    getProductos,
    getProductoPorId,
    registrarProducto,
    actualizarProducto,
    eliminarProducto
} from "../controladores/Productos.js";
import { verificarUsuario, administrador } from "../intermedio/AutenticarUsuario.js";

const enrutar = express.Router();

enrutar.get('/productos', verificarUsuario, getProductos);
enrutar.get('/producto/:id', verificarUsuario, getProductoPorId);
enrutar.post('/producto', verificarUsuario, registrarProducto);
enrutar.patch('/producto/:id', verificarUsuario, actualizarProducto);
enrutar.delete('/producto/:id', verificarUsuario, administrador, eliminarProducto);

export default enrutar;