import express from 'express';
import cors from 'cors';
import { createUser, getUserByUsernameAndPassword } from './database.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;

// Middleware para permitir el análisis de solicitudes JSON
app.use(express.json());

// Middleware para habilitar CORS
const corsOptions = {
  origin: "http://127.0.0.1:4000",
  methods: ["POST", "GET"],
  credentials: true,
}
app.use(cors(corsOptions));

// Clave secreta para firmar y verificar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto';

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const { usuario, password, nombre, apellido, dni, email } = req.body;

    try {
        const nuevoUsuarioId = await createUser(usuario, password, nombre, apellido, dni, email);
        res.status(201).json({ id: nuevoUsuarioId, message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        console.log('Intento de inicio de sesión recibido:', usuario); // Registrar el usuario que intenta iniciar sesión

        // Verificar si el usuario y la contraseña coinciden en la base de datos
        const usuarioEncontrado = await getUserByUsernameAndPassword(usuario, password);

        if (usuarioEncontrado) {
            console.log('Inicio de sesión exitoso:', usuario); // Registrar el inicio de sesión exitoso
            
            // Generar un token JWT con el usuario como payload
            const token = jwt.sign({ usuario }, JWT_SECRET);

            // Enviar el token JWT como respuesta
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } else {
            console.log('Credenciales incorrectas:', usuario); // Registrar las credenciales incorrectas
            // Las credenciales son inválidas, enviar una respuesta de error
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});