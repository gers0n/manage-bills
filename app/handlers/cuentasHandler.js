const Cuenta = require('../models/cuenta');

exports.createCuenta = (req, res) => { /*create new cuenta*/
	const cuenta = new Cuenta();
	cuenta.name = req.body.name;
	if( cuenta.name ) {
		cuenta.save( (err) => {
			if (err) 
				return res.status(401).json({'error':'error: '+err});
			res.status(201).json({message: 'Cuenta created', cuenta:cuenta});
		});
	}
};

exports.getCuentaById = (req, res) => { /*get a Cuenta*/
	Cuenta.findById(req.params.Id, (err, cuenta) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get the cuenta #"+req.params.Id+" cuenta", data: cuenta})
	});
};

exports.updateCuentaById = (req, res) => { /*update a cuenta*/
	Cuenta.findById(req.params.Id, (err, cuenta) => {
		if (err)
			return res.status(401).json({error: err});
		
		Cuenta.update(req.body, (errUpd) => {
			if (errUpd)
				return res.status(401).json({error: errUpd});
			res.status(202).json({message: "updated the cuenta #"+req.params.Id+" cuentas", data: cuenta});
		});
	});
};

exports.removeCuentaById = (req, res) => { /*remove a cuenta*/
	Cuenta.remove({_id: req.params.Id}, (err, cuenta) => {
		if (err)
			return res.status(402).json({error: err});
		res.status(202).json({message: "deleting the cuenta #"+req.params.Id+" cuentas", data: cuenta});
	});
};

exports.getAllCuentas = (req, res) => { /*get all cuentas*/
	Cuenta.find({}, (err, cuentas) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get all cuentas", data: cuentas})
	});	
};