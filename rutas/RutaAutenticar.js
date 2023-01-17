import express, { Router } from 'express';
import { Login, LogOut, Yo } from '../controladores/Autenticar.js';

const enrutar = express.Router();

enrutar.get('/yo',Yo);
enrutar.post('/ingresar',Login);
enrutar.delete('/salir',LogOut);

export default enrutar;