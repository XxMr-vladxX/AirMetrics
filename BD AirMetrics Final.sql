-- Tabla: usuarios
CREATE TABLE usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE,
  contrasena VARCHAR(30) NOT NULL,
  fecha_registro DATE NOT NULL
);

-- Tabla: registros_sensores
CREATE TABLE registros_sensores (
  id_lectura INT PRIMARY KEY AUTO_INCREMENT,
  co2 INT,
  temperatura_celsius FLOAT,
  humedad FLOAT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL
);

-- Tabla: alertas
CREATE TABLE alertas (
  id_alerta INT PRIMARY KEY AUTO_INCREMENT,
  id_lectura INT,
  tipo_alerta ENUM('CO2', 'Temperatura', 'Humedad') NOT NULL,
  valor_detectado FLOAT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  FOREIGN KEY (id_lectura) REFERENCES registros_sensores(id_lectura)
);

-- Tabla: notificaciones
CREATE TABLE notificaciones (
  id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_alerta INT,
  mensaje VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_alerta) REFERENCES alertas(id_alerta)
);

# SP LOGIN
DELIMITER $$

CREATE PROCEDURE login(IN p_correo VARCHAR(100), IN p_contrasena VARCHAR(30))
BEGIN
    SELECT COUNT(*) > 0 AS login_exitoso
    FROM usuarios
    WHERE correo = p_correo AND contrasena = p_contrasena;
END$$

DELIMITER ;


# SP CREAR USUARIO (REGISTRAR)
DELIMITER $$

CREATE PROCEDURE crear_usuario(IN p_nombre VARCHAR(100), IN p_correo VARCHAR(100), IN p_contrasena VARCHAR(30))
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT FALSE AS creado;
    END;

    INSERT INTO usuarios (nombre, correo, contrasena, fecha_registro)
    VALUES (p_nombre, p_correo, p_contrasena, CURDATE());

    SELECT TRUE AS creado;
END$$

DELIMITER ;


# SP REPORTE MENSUAL 
DELIMITER $$

CREATE PROCEDURE reporte_mensual(IN p_mes VARCHAR(20))
BEGIN
    SELECT
        id_lectura,
        co2,
        temperatura_celsius,
        humedad,
        DATE(fecha) AS fecha,
        TIME(hora) AS hora
    FROM registros_sensores
    WHERE MONTHNAME(fecha) = p_mes
      AND (
          co2 > 1000 OR temperatura_celsius > 35 OR humedad > 80
      )
    ORDER BY fecha, hora;
END$$

DELIMITER ;


# VISTA CO2 DIARIO PROMEDIO P/H
CREATE OR REPLACE VIEW co2_diario AS
SELECT
    fecha,
    HOUR(hora) AS hora,
    AVG(co2) AS co2_promedio
FROM registros_sensores
WHERE CONCAT(fecha, ' ', hora) >= NOW() - INTERVAL 1 DAY
GROUP BY fecha, HOUR(hora)
ORDER BY fecha DESC, hora;


# VISTA MAX Y MIN CO2 EN 7 DIAS
CREATE OR REPLACE VIEW co2_semanal AS
SELECT
    fecha,
    DAYNAME(fecha) AS dia_nombre,
    MAX(co2) AS co2_max,
    MIN(co2) AS co2_min
FROM registros_sensores
WHERE fecha >= CURDATE() - INTERVAL 7 DAY
GROUP BY fecha
ORDER BY fecha DESC;


# VISTA MEDIDAS ACTUALES
CREATE OR REPLACE VIEW medidas_actuales AS
SELECT *
FROM registros_sensores
WHERE CONCAT(fecha, ' ', hora) = (
    SELECT MAX(CONCAT(fecha, ' ', hora))
    FROM registros_sensores
);

# Insert´s tabla de usuarios

INSERT INTO usuarios (nombre, correo, contrasena, fecha_registro) VALUES
('Oskar Armenta', 'oskar@gmail.com', 'oskar123', NOW()),
('Josue Valenzuela', 'josue@gmail.com', 'josue123', NOW()),
('Alvaro Grijalva', 'alvaro@gmail.com', 'alvaro123', NOW()),
('Edgar Villagrana', 'edgar@gmail.com', 'edgar123', NOW()),
('Rodolfo Lopez', 'rodolfo@gmail.com', 'rodolfo123', NOW()),
('Vladimir Álcala', 'vladimir@gmail.com', 'vladimir123', NOW());
