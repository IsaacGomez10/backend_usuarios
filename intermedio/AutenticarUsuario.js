import Usuarios from "../modelos/ModeloUsuario.js";

export const verificarUsuario = async (req, res, next) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ msg: 'No ha ingresado, por favor ingrese a su cuenta.' });
    }
    const usuario = await Usuarios.findOne({
        where: {
            uuid: req.session.usuarioId
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'No se pudo acceder' });
    req.usuarioId = usuario.id;
    req.rol = usuario.rol;
    next();
}

export const administrador = async (req, res, next) => {
    const usuario = await Usuarios.findOne({
        where: {
            uuid: req.session.usuarioId
        }
    });
    if (!usuario) return res.status(404).json({ msg: 'No se pudo acceder' });
    if(usuario.rol !== 'admin') return res.status(403).json({msg:'Usted no es administrador.'});
    next();
}