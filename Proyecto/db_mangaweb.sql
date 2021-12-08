-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2021 a las 17:14:26
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_mangaweb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBiblioteca` (IN `usuario` VARCHAR(50))  SELECT ID_Biblioteca FROM usuarios WHERE usuarios.Usuario = usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCarrito` (IN `usuario` VARCHAR(50))  SELECT ID_ComprasMangas FROM usuarios WHERE usuarios.Usuario = usuario$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_actualizacion`
--

CREATE TABLE `control_actualizacion` (
  `ID` int(11) NOT NULL,
  `ACCION` varchar(100) NOT NULL,
  `FECHAHORA` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `control_actualizacion`
--

INSERT INTO `control_actualizacion` (`ID`, `ACCION`, `FECHAHORA`) VALUES
(1, 'Se actualizaron los datos del usuario :aa', '2021-12-07 21:13:24'),
(4, 'Se actualizaron los datos del usuario :f', '2021-12-07 21:30:04'),
(5, 'Se actualizaron los datos del usuario :f', '2021-12-07 21:30:36'),
(6, 'Se actualizaron los datos del usuario :Bronzebatt', '2021-12-07 21:36:13'),
(7, 'Se actualizaron los datos del usuario :The Boss :', '2021-12-07 22:04:14'),
(8, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 00:07:18'),
(9, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:01:35'),
(10, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:22:36'),
(11, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:22:48'),
(12, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:23:08'),
(13, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:23:16'),
(14, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:23:30'),
(15, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 01:23:36'),
(16, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 09:52:51'),
(17, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 09:55:06'),
(18, 'Se actualizaron los datos del usuario :m4rt0d0', '2021-12-08 09:57:17'),
(19, 'Se actualizaron los datos del usuario :m4rt0d0', '2021-12-08 09:57:45'),
(20, 'Se actualizaron los datos del usuario :m4rt0d0', '2021-12-08 09:58:31'),
(21, 'Se actualizaron los datos del usuario :m4rt0d0', '2021-12-08 10:22:09'),
(22, 'Se actualizaron los datos del usuario :Bronzebatt', '2021-12-08 10:32:27'),
(23, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 10:43:23'),
(24, 'Se actualizaron los datos del usuario :m4rt0d0', '2021-12-08 10:45:03'),
(25, 'Se actualizaron los datos del usuario :GrimaldoRi', '2021-12-08 10:45:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_registro`
--

CREATE TABLE `control_registro` (
  `ID` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `ACCION` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `control_registro`
--

INSERT INTO `control_registro` (`ID`, `FECHA`, `ACCION`) VALUES
(4, '2021-12-07', 'Se agregó el nuevo usuario f exitosamente.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `ID_tipo_usuario` int(50) NOT NULL,
  `type` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`ID_tipo_usuario`, `type`) VALUES
(0, 'CLIENTE'),
(1, 'ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `FNacimiento` date NOT NULL,
  `Foto` text NOT NULL,
  `ID_tipo_usuario` int(11) NOT NULL,
  `ID_Biblioteca` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ID_Biblioteca`)),
  `ID_ComprasMangas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ID_ComprasMangas`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Usuario`, `Nombre`, `Correo`, `Password`, `FNacimiento`, `Foto`, `ID_tipo_usuario`, `ID_Biblioteca`, `ID_ComprasMangas`) VALUES
(6, 'Bronzebatt', 'Julian Perez', 'suCorreo@gmail.com', '$2y$10$ZyTeSeB.nMPm96UTqBDdqexC3/G/UQnHVcrp9UeddLKh.OA91Sl2q', '2021-12-07', 'FotosPerfil/920533165880.jpeg', 1, '[]', '[]'),
(16, 'GrimaldoRi', 'Grimaldo', 'rgrim@gmail.com', '$2y$10$3J6pR8seu74tcPEWBUwrMe.zUwWI8s/rZacanE7LohjzEzvGkYcpq', '2005-02-09', 'FotosPerfil/92101030225.png', 1, '[\"2\",\"17\",\"18\",\"71\",\"48\"]', '[\"53\",\"29\"]'),
(9, 'Mylo', 'Jesus Estrella', 'NoMasCorreos@gmail.com', '$2y$10$7OEDVXFbPZ5njlqJrenyV.lojPBEO6VmrtHpKo4SbDtVnF4p233lG', '2021-11-11', 'Imagenes/Header_Footer/user-icon.png', 1, '[]', '[]'),
(7, 'Raku', 'Ricardo Grimaldo', 'ElOtroCorreo@gmail.com', '$2y$10$E7h9iLq6yuKR69jphzU2TO8p.LllGtQGMMptE1XKahwKksaZdGBC6', '2021-11-11', 'Imagenes/Header_Footer/user-icon.png', 1, '[]', '[]'),
(10, 'The Boss :', 'God', 'Alpha@Omega.com', '$2y$10$/cbJZoTkHH9s0Pm.7GhdZOYBoSIzmGd1spJrc9AChBswh.tyUtTTi', '2112-12-21', 'Imagenes/Header_Footer/user-icon.png', 1, '[\"2\"]', '[\"1\"]'),
(1, 'XDave', 'david', 'd@gmail.com', '$2y$10$n0PAXbL0BbWnUbk5ppVxfOomiPtCI7CPnu7klv6gbB7e6w48xHjfq', '2222-02-11', 'Imagenes/Header_Footer/user-icon.png', 1, '[]', '[\"4\"]'),
(8, 'm4rt0d0', 'Marco Saldivar', 'UnCorreoMas@gmail.com', '$2y$10$LN9jrnI3Ds9v03tgJmQLJ.zI.OJbJC.PE3py85/6oerJKyWvqA2xa', '2021-11-11', 'FotosPerfil/372976674694.jpeg', 1, '[]', '[]'),
(3, 'test', 'dave', 'dd@gmail.com', '$2y$10$K6fwJWVo47BzDZBUjbn6ReEwR55ZwgRECE4bLZ.qbCJmU9RQyVhQ6', '1111-11-11', 'Imagenes/Header_Footer/user-icon.png', 0, '[]', '[]');

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `control_Nuevos_Usuarios` AFTER INSERT ON `usuarios` FOR EACH ROW INSERT INTO control_registro(FECHA,ACCION)
VALUES(CURRENT_DATE,concat('Se agregó el nuevo usuario ',new.usuario, ' exitosamente.'))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `control_cambios` AFTER UPDATE ON `usuarios` FOR EACH ROW INSERT INTO control_actualizacion (ACCION) VALUES (concat('Se actualizaron los datos del usuario :',new.usuario))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuariosadmin`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usuariosadmin` (
`ID` int(11)
,`Usuario` varchar(10)
,`Nombre` varchar(50)
,`Correo` varchar(50)
,`FNacimiento` date
,`Foto` text
,`type` varchar(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuarioscliente`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usuarioscliente` (
`ID` int(11)
,`Usuario` varchar(10)
,`Nombre` varchar(50)
,`Correo` varchar(50)
,`FNacimiento` date
,`Foto` text
,`type` varchar(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuariosgeneral`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usuariosgeneral` (
`ID` int(11)
,`Usuario` varchar(10)
,`Nombre` varchar(50)
,`Correo` varchar(50)
,`FNacimiento` date
,`Foto` text
,`type` varchar(11)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `usuariosadmin`
--
DROP TABLE IF EXISTS `usuariosadmin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usuariosadmin`  AS SELECT `usuarios`.`ID` AS `ID`, `usuarios`.`Usuario` AS `Usuario`, `usuarios`.`Nombre` AS `Nombre`, `usuarios`.`Correo` AS `Correo`, `usuarios`.`FNacimiento` AS `FNacimiento`, `usuarios`.`Foto` AS `Foto`, `tipo_usuario`.`type` AS `type` FROM (`usuarios` join `tipo_usuario`) WHERE `usuarios`.`ID_tipo_usuario` = `tipo_usuario`.`ID_tipo_usuario` AND `tipo_usuario`.`type` = 'ADMIN' ;

-- --------------------------------------------------------

--
-- Estructura para la vista `usuarioscliente`
--
DROP TABLE IF EXISTS `usuarioscliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usuarioscliente`  AS SELECT `usuarios`.`ID` AS `ID`, `usuarios`.`Usuario` AS `Usuario`, `usuarios`.`Nombre` AS `Nombre`, `usuarios`.`Correo` AS `Correo`, `usuarios`.`FNacimiento` AS `FNacimiento`, `usuarios`.`Foto` AS `Foto`, `tipo_usuario`.`type` AS `type` FROM (`usuarios` join `tipo_usuario`) WHERE `usuarios`.`ID_tipo_usuario` = `tipo_usuario`.`ID_tipo_usuario` AND `tipo_usuario`.`type` = 'CLIENTE' ;

-- --------------------------------------------------------

--
-- Estructura para la vista `usuariosgeneral`
--
DROP TABLE IF EXISTS `usuariosgeneral`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usuariosgeneral`  AS SELECT `usuarios`.`ID` AS `ID`, `usuarios`.`Usuario` AS `Usuario`, `usuarios`.`Nombre` AS `Nombre`, `usuarios`.`Correo` AS `Correo`, `usuarios`.`FNacimiento` AS `FNacimiento`, `usuarios`.`Foto` AS `Foto`, `tipo_usuario`.`type` AS `type` FROM (`usuarios` join `tipo_usuario`) WHERE `usuarios`.`ID_tipo_usuario` = `tipo_usuario`.`ID_tipo_usuario` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `control_actualizacion`
--
ALTER TABLE `control_actualizacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `control_registro`
--
ALTER TABLE `control_registro`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`ID_tipo_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Usuario`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `ID_tipo_usuario` (`ID_tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `control_actualizacion`
--
ALTER TABLE `control_actualizacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `control_registro`
--
ALTER TABLE `control_registro`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11116;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `tipo_usuario` FOREIGN KEY (`ID_tipo_usuario`) REFERENCES `tipo_usuario` (`ID_tipo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
