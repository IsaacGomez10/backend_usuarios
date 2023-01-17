import  Sequelize  from "sequelize";
//cambiar nombre de base de datos en esta caso 'usuarios'
const bd = new Sequelize('usuarios','root','',{
    host:'localhost',
    dialect:'mysql'
});

export default bd;