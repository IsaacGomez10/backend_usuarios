import Usuarios from '../modelos/ModeloUsuario.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'Este usuario no existe, registrese por favor' });
    const match = await argon2.verify(usuario.contrasena, req.body.contrasena);
    if (!match) return res.status(400).json({ msg: 'Contraseña incorrecta, verifique datos' });
    req.session.usuarioId = usuario.uuid;
    const uuid = usuario.uuid;
    const nombres = usuario.nombres;
    const apellidos = usuario.apellidos;
    const email = usuario.email;
    const rol = usuario.rol;
    res.status(200).json({ uuid, nombres, apellidos, email, rol });
}

export const Yo = async (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ msg: 'No ha ingresado, por favor ingrese a su cuenta.' });
    }
    const usuario = await Usuarios.findOne({
        attributes: ['uuid', 'nombres', 'apellidos', 'email', 'rol'],
        where: {
            uuid: req.session.usuarioId
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'No se pudo acceder' });
    res.status(200).json(usuario)
}

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: 'No se ha salido aun.' })
        res.status(200).json({ msg: 'Sessión cerrada.' })
    });
}