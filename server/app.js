import express from 'express';
import cors from 'cors';
import { createUser, getUserByUsernameAndPassword, pool } from './database.js';
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
app.get('/hello', (req, res) => {
    res.send('¡Hola, mundo!');
});


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
app.put('/usuarios/:correo/perfil', async (req, res) => {
    const { nombre, apellido, dni, email } = req.body;
    const { correo } = req.params;

    try {
        const sql = `UPDATE Users SET Nombre = ?, Apellido = ?, DNI = ?, Email = ? WHERE Usuario = ?`;
        const values = [nombre, apellido, dni, email, correo];
        await pool.query(sql, values);
        res.status(200).json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el perfil del usuario' });
    }
});

app.post('/partidas/:id/jugadores', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la partida
    const { nombre, apellido, dni } = req.body; // Obtener los datos del jugador

    try {
        // Verificar si la partida existe antes de insertar el jugador
        const partidaExiste = await pool.query('SELECT * FROM Partidas WHERE ID = ?', [id]);

        if (partidaExiste.length === 0) {
            return res.status(404).json({ message: 'La partida no existe' });
        }

        // Insertar el jugador en la tabla Partidas
        await pool.query(
            'INSERT INTO Partidas (CampoID, NombreJugador, ApellidoJugador, DNIJugador ) VALUES (?, ?, ?, ?)',
            [id, nombre, apellido, dni]
        );

        res.status(201).json({ message: 'Jugador agregado correctamente a la partida' });
    } catch (error) {
        console.error('Error al agregar jugador a la partida:', error);
        res.status(500).json({ message: 'Error al agregar jugador a la partida' });
    }
});

app.post('/partidas/minervacombat/:dia', async (req, res) => {
    const { dia } = req.params;
    const { nombre, apellido, dni } = req.body;

    // Verificar si el valor proporcionado es uno de los valores válidos
    const valoresValidos = ['sabado', 'domingo', 'festivo'];
    if (!valoresValidos.includes(dia.toLowerCase())) {
        return res.status(400).json({ message: 'El valor de dia proporcionado no es válido' });
    }

    try {
        // Obtener el ID de la partida correspondiente al día especificado
        const [partida] = await pool.query(
            'SELECT ID FROM Partidas_MinervaCombat WHERE Dia = ? AND Estado = "Activa"',
            [dia]
        );

        if (partida.length === 0) {
            return res.status(404).json({ message: 'No hay partida activa para el día especificado' });
        }

        const partidaId = partida[0].ID;

        // Realiza la inserción de datos en la lista de partida del día especificado
        const [result] = await pool.query(
            `INSERT INTO ListaPartida_MinervaCombat (PartidaID, DiaPartida, NombreJugador, ApellidoJugador, DNIJugador) VALUES (?, ?, ?, ?, ?)`,
            [partidaId, dia, nombre, apellido, dni]
        );

        res.status(201).json({ message: `Datos agregados a la lista de partida del ${dia} correctamente` });
    } catch (error) {
        console.error(`Error al agregar datos a la lista de partida del ${dia}:`, error);
        res.status(500).json({ message: `Error al agregar datos a la lista de partida del ${dia}` });
    }
});




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});