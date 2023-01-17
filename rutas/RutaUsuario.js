import express from "express";
import {
    getUsuarios,
    getUsuarioPorId,
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controladores/Usuarios.js";
import { verificarUsuario, administrador } from "../intermedio/AutenticarUsuario.js";

const enrutar = express.Router();

enrutar.get('/usuarios', verificarUsuario, administrador, getUsuarios);
enrutar.get('/usuario/:id', verificarUsuario, administrador, getUsuarioPorId);
enrutar.post('/usuario', verificarUsuario, administrador, registrarUsuario);
enrutar.patch('/usuario/:id', verificarUsuario, administrador, actualizarUsuario);
enrutar.delete('/usuario/:id', verificarUsuario, administrador, eliminarUsuario);

export default enrutar;