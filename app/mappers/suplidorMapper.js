'use strict'

module.exports.fromRequest = (supidor) => {
	return supidor.Nombre ? {
		Nombre: supidor.Nombre,
		Identificacion: supidor.Identificacion,
		NumeroTelefonico: supidor.NumeroTelefonico,
	} : {};
};
