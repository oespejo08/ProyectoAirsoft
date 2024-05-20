import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configurar la conexión a la base de datos
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export {pool} ;

// Intenta conectarte a la base de datos
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
        // Realiza alguna operación de prueba aquí, como una consulta simple
        connection.query('SELECT 1', (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
            } else {
                console.log('Consulta exitosa. Resultado:', results);
            }
            // Libera la conexión
            connection.release();
        });
    }
});

export async function createUser(Email, password) {
    try {
        const [result] = await pool.query(
            'INSERT INTO Users (Email, Password) VALUES (?, ?)',
            [Email, password]
        );
        console.log('Usuario creado con éxito. ID:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}

export async function findJugadorApuntado(DNIJUGADOR,DiaPartida){
    try{
        const [rows] = await pool.query('SELECT * FROM ListaPartida_MinervaCombat WHERE DNIJUGADOR=? AND DiaPartida=?',[DNIJUGADOR,DiaPartida])
        return rows[0];
    }catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};

export async function getListaJugadoresAdministradores(DiaPartida){
    try{
        
        const [rows] = await pool.query('SELECT NombreJugador,ApellidoJugador,DNIJugador FROM ListaPartida_MinervaCombat WHERE DiaPartida=?',[DiaPartida])
        return rows;
    }catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getListaJugadores(DiaPartida){
    try{
        const [rows] = await pool.query('SELECT NombreJugador,ApellidoJugador FROM ListaPartida_MinervaCombat WHERE DiaPartida=?',[DiaPartida])
        return rows;
    }catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}



// Función para obtener un administrador por su ID
export async function getAdministadorByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM Users WHERE Email = ? AND is_admin=true', [email]);
        return rows[0]; // Devuelve el primer administrador encontrado o null si no hay resultados
    } catch (error) {
        console.error('Error al obtener el administrador por Email:', error);
        throw error;
    }
}

export async function getDatosUsers(email){
    try{
        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        return rows[0]; // Devuelve el primer usuario encontrado por el email o null
    }catch(error){
        console.error('Error al obtener los datos por email:', error)
        throw error;
    }
}






// // Función para crear un usuario y añadirlo a la tabla Users
// export async function createUser(usuario, password, nombre, apellido, dni, email) {
//     try {
//         const [result] = await pool.query(
//             'INSERT INTO Users (Usuario, Password, Nombre, Apellido, DNI, Email) VALUES (?, ?, ?, ?, ?, ?)',
//             [usuario, password, nombre, apellido, dni, email]
//         );
//         console.log('Usuario creado con éxito. ID:', result.insertId);
//         return result.insertId;
//     } catch (error) {
//         console.error('Error al crear el usuario:', error);
//         throw error;
//     }
// }

// Función para cambiar la contraseña de un usuario
export async function changePassword(usuario, nuevaPassword) {
    try {
        const [result] = await pool.query('UPDATE Users SET Password = ? WHERE Usuario = ?', [nuevaPassword, usuario]);
        if (result.affectedRows === 0) {
            console.log(`El usuario ${usuario} no fue encontrado.`);
            return false;
        }
        console.log(`Contraseña del usuario ${usuario} cambiada con éxito.`);
        return true;
    } catch (error) {
        console.error('Error al cambiar la contraseña del usuario:', error);
        throw error;
    }
}

// Función para obtener un usuario por nombre de usuario y contraseña
export async function getUserByUsernameAndPassword(usuario, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM Users WHERE Usuario = ? AND Password = ?', [usuario, password]);
        return rows.length ? rows[0] : null; // Devuelve el primer usuario encontrado o null si no hay resultados
    } catch (error) {
        console.error('Error al obtener el usuario por nombre de usuario y contraseña:', error);
        throw error;
    }
}
