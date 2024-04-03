CREATE DATABASE AirsoftApp;

USE AirsoftApp;

CREATE TABLE Users (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(255) UNIQUE NOT NULL,
    Password TEXT NOT NULL,
    Nombre TEXT NOT NULL,
    Apellido TEXT NOT NULL,
    DNI VARCHAR(9) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE CamposJuego (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre TEXT NOT NULL,
    Ciudad TEXT NOT NULL
    AdministradorID INTEGER,
    FOREIGN KEY (AdministradorID) REFERENCES Administradores(ID);
);


CREATE TABLE Partidas_MinervaCombat (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    CampoID INTEGER NOT NULL,
    Fecha TEXT NOT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activa',
    FOREIGN KEY (CampoID) REFERENCES CamposJuego(ID),
    ListaActiva BOOLEAN NOT NULL DEFAULT TRUE,
    COLUMN AdministradorID INTEGER NOT NULL,
    FOREIGN KEY (AdministradorID) REFERENCES Administradores(ID);
);

CREATE TABLE Partidas_ZonaZ (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    CampoID INTEGER NOT NULL,
    Fecha TEXT NOT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activa',
    FOREIGN KEY (CampoID) REFERENCES CamposJuego(ID),
    ListaActiva BOOLEAN NOT NULL DEFAULT TRUE,
    AdministradorID INTEGER NOT NULL,
    FOREIGN KEY (AdministradorID) REFERENCES Administradores(ID);
);

CREATE TABLE Partidas_KampoLira (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    CampoID INTEGER NOT NULL,
    Fecha TEXT NOT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activa',
    FOREIGN KEY (CampoID) REFERENCES CamposJuego(ID),
    ListaActiva BOOLEAN NOT NULL DEFAULT TRUE,
    AdministradorID INTEGER NOT NULL,
    FOREIGN KEY (AdministradorID) REFERENCES Administradores(ID);
);

CREATE TABLE Administradores (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(255) UNIQUE NOT NULL,
    Password TEXT NOT NULL,
    Nombre TEXT NOT NULL,
    Apellido TEXT NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Administradores (Usuario, Password, Nombre, Apellido, Email)
VALUES ('OscarDev', 'oscardev', 'Oscar', 'Espejo', 'oespejo08@gmail.com');


INSERT INTO Users (Usuario, Password, Nombre, Apellido, DNI, Email) 
VALUES 
('usuario1', 'password1', 'Eduardo', 'Espejo', '12345678A', 'usuario1@example.com'),
('usuario2', 'password2', 'Carolina', 'Castro', '12345678B', 'usuario2@example.com'),
('usuario3', 'password3', 'David', 'Espejo', '12345678C', 'usuario3@example.com'),
('usuario4', 'password4', 'Mariangeles', 'Espejo', '12345678D', 'usuario4@example.com');