'use strict'

module.exports.fromRequest = (supidor) => {
	return {
		Nombre: supidor.Nombre || "",
		Identificacion: supidor.Identificacion || "",
		NumeroTelefonico: supidor.NumeroTelefonico || "",
	};
};
