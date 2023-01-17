import Productos from "../modelos/ModeloProducto.js";
import Usuarios from "../modelos/ModeloUsuario.js";
import { Op } from 'sequelize';

export const getProductos = async (req, res) => {
    try {
        let respuesta;
        if (req.rol === 'admin') {
            respuesta = await Productos.findAll({
                attributes: ['uuid', 'nombre', 'marca', 'precio'],
                include: [{
                    model: Usuarios,
                    attributes: ['nombres', 'email']
                }]
            });
        } else {
            respuesta = await Productos.findAll({
                where: {
                    usuarioId: req.usuarioId
                }
                , include: [{
                    model: Usuarios,
                    attributes: ['nombres', 'email']
                }]
            });
        }
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductoPorId = async (req, res) => {
    try {
        const producto = await Productos.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!producto) return res.status(404).json({ msg: 'Este producto no existe' });
        let respuesta;
        if (req.rol === 'admin') {
            respuesta = await Productos.findOne({
                attributes: ['uuid', 'nombre', 'marca', 'precio'],
                where: {
                    id: producto.id
                },
                include: [{
                    model: Usuarios,
                    attributes: ['nombres', 'email']
                }]
            });
        } else {
            respuesta = await Productos.findOne({
                attributes: ['uuid', 'nombre', 'marca', 'precio'],
                where: {
                    [Op.and]: [{ id: producto.id }, { usuarioId: req.usuarioId }]
                }
                , include: [{
                    model: Usuarios,
                    attributes: ['nombres', 'email']
                }]
            });
        }
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const registrarProducto = async (req, res) => {
    const { nombre, marca, precio } = req.body;
    try {
        await Productos.create({
            nombre: nombre,
            marca: marca,
            precio: precio,
            usuarioId: req.usuarioId
        });
        res.status(201).json({ msg: 'Se registro correctamente.' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const actualizarProducto = async (req, res) => {
    try {
        const producto = await Productos.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!producto) return res.status(404).json({ msg: 'Este producto no existe' });
        const { nombre, marca, precio } = req.body;
        if (req.rol === 'admin') {
            await Productos.update({ nombre, marca, precio }, {
                where: {
                    id: producto.id
                }
            });
        } else {
            if(req.usuarioId !== producto.usuarioId) return res.status(403).json({msg:'este usuario no tiene permisos suficientes.'})
            await Productos.update({ nombre, marca, precio }, {
                where: {
                    [Op.and]: [{ id: producto.id }, { usuarioId: req.usuarioId }]
                }
            });
        }
        res.status(200).json({msg:'Producto actualizado correctamenre.'});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const eliminarProducto = async (req, res) => {
    try {
        const producto = await Productos.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!producto) return res.status(404).json({ msg: 'Este producto no existe' });
        const { nombre, marca, precio } = req.body;
        if (req.rol === 'admin') {
            await Productos.destroy({
                where: {
                    id: producto.id
                }
            });
        } else {
            if(req.usuarioId !== producto.usuarioId) return res.status(403).json({msg:'este usuario no tiene permisos suficientes.'})
            await Productos.destroy({
                where: {
                    [Op.and]: [{ id: producto.id }, { usuarioId: req.usuarioId }]
                }
            });
        }
        res.status(200).json({msg:'Producto eliminado correctamenre.'});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}