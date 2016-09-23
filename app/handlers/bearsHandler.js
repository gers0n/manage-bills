const Bear = require('../models/bear');

exports.createBear = (req, res) => { /*create new bear*/
	const bear = new Bear();
	bear.name = req.body.name;
	if( bear.name ) {
		bear.save( (err) => {
			if (err)
				return res.status(401).json({'error':'error: '+err});
			res.status(201).json({message: 'Bear created', bear:bear});
		});
	}
};

exports.getBearById = (req, res) => { /*get a bear*/
	Bear.findById(req.params.Id, (err, bear) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get the bear #"+req.params.Id+" bear", data: bear})
	});
};

exports.updateBearById = (req, res) => { /*update a bear*/
	Bear.findById(req.params.Id, (err, bear) => {
		if (err)
			return res.status(401).json({error: err});
		
		Bear.update(req.body, (errUpd) => {
			if (errUpd)
				return res.status(401).json({error: errUpd});
			res.status(202).json({message: "updated the bear #"+req.params.Id+" bears", data: bear});
		});
	});
};

exports.removeBearById = (req, res) => { /*remove a bear*/
	Bear.remove({_id: req.params.Id}, (err, bear) => {
		if (err)
			return res.status(402).json({error: err});
		res.status(202).json({message: "deleting the bear #"+req.params.Id+" bears", data: bear});
	});
};

exports.getAllBears = (req, res) => { /*get all bears*/
	Bear.find({}, (err, bears) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get all bears", data: bears})
	});	
};