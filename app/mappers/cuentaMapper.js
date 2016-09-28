'use strict'

module.exports.fromRequest = (cuenta) => {
	return cuenta.NombreUsuario ? {
		NombreUsuario: cuenta.NombreUsuario,
		Name: cuenta.Name,
		Password: cuenta.Password
	} : {};
};
