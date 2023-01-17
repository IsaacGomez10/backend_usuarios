import Usuarios from "../modelos/ModeloUsuario.js";
import argon2 from 'argon2';

export const getUsuarios = async (req, res) => {
    try {
        const respuesta = await Usuarios.findAll({
            attributes: ['uuid', 'nombres', 'apellidos', 'email', 'rol']
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUsuarioPorId = async (req, res) => {
    try {
        const respuesta = await Usuarios.findOne({
            attributes: ['uuid', 'nombres', 'apellidos', 'email', 'rol'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const registrarUsuario = async (req, res) => {
    const { nombres, apellidos, email, contrasena, confContrasena, rol } = req.body;
    if (contrasena !== confContrasena) return res.status(400).json({ msg: 'Las contraseñas no coinciden.' });
    const hashContrasena = await argon2.hash(contrasena);
    try {
        await Usuarios.create({
            nombres: nombres,
            apellidos: apellidos,
            email: email,
            contrasena: hashContrasena,
            rol: rol
        });
        res.status(201).json({ msg: 'Se registro correctamente!' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const actualizarUsuario = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'No se actualizo, verifique datos nuevamente.' });
    const { nombres, apellidos, email, contrasena, confContrasena, rol } = req.body;
    let hashContrasena;
    if (contrasena === "" || contrasena === null) {
        hashContrasena = usuario.contrasena
    } else {
        hashContrasena = await argon2.hash(contrasena);
    }
    if (contrasena !== confContrasena) return res.status(404).json({ msg: 'Las contraseñas no coinciden.' });
    try {
        await Usuarios.update({
            nombres: nombres,
            apellidos: apellidos,
            email: email,
            contrasena: hashContrasena,
            rol: rol
        }, {
            where: {
                id: usuario.id
            }
        });
        res.status(200).json({ msg: 'Se actualizo correctamente.' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const eliminarUsuario = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'No se pudo eliminar' });
    try {
        await Usuarios.destroy({
            where: {
                id: usuario.id
            }
        });
        res.status(201).json({ msg: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}