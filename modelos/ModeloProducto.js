import { Sequelize } from "sequelize";
import bd from "../configuracion/Basedatos.js";
import Usuarios from "./ModeloUsuario.js";

const { DataTypes } = Sequelize;

const Productos = bd.define('productos', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },marca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

}, {
    freezeTableName: true
});

Usuarios.hasMany(Productos);
Productos.belongsTo(Usuarios,{foreignKey:'usuarioId'});

export default Productos;