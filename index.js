import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import bd from './configuracion/Basedatos.js';
import SequelizeStore from 'connect-session-sequelize';
import RutaUsuario from './rutas/RutaUsuario.js'
import RutaProducto from './rutas/RutaProducto.js'
import RutaAutenticar from './rutas/RutaAutenticar.js'
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: bd
});
/*en confirguracion/basededatos cambiar el nombre de la base de datos,
crear base de datos en mysql, luego descomentar el 
codigo de linea 22 a 24 y tambien la linea 45*/
// (async() => {
//     await bd.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentiales: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(RutaUsuario);
app.use(RutaProducto);
app.use(RutaAutenticar);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Corriendo servidor...');
});