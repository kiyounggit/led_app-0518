var mongoose = require('mongoose');
// connect to db
mongoose.connect('mongodb://kiyoung:kiyoung@192.168.170.3/kiyoung');

//Schemas
var Sensorcheme = new mongoose.Schema({
    name: String,
    type: String,
    switch: String,
});

// Models
var SensorModel = mongoose.model( 'LED', Sensorcheme);

exports.getSensors = function(req, res) {
    console.log( 'GET /api/sensors/list' );

    return SensorModel.find( function( err, sensors ) {
        if( err ) {
            console.log( err );
            return res.send(err);
        }
        return res.send( sensors );
    });
};


exports.getAllSensors = function(req, res) {
    console.log( 'GET /api/sensors' );

    return SensorModel.find( function( err, sensors ) {
        if( err ) {
            console.log( err );
            return res.send(err);
        }
        //return res.send( sensors );
        return res.render("index_form2", {sensors: sensors});
    });
};

// sensors/:id -  GET / id로 선택된 book 정보얻기
exports.getSensorById = function(req, res) {
    return SensorModel.findById( req.params.id, function(err, sensor) {


        if (err)
            res.send(err);
        res.send(sensor);
    });
};

// POST:insert
exports.addSensor = function(req, res) {

	console.log("Adding new sensor: " + req.body.name );

    var sensor = new SensorModel();
    sensor.type = req.body.type;
    sensor.name = req.body.name;
    sensor.switch = req.body.switch;
    return sensor.save( function( err ) {
        if( err ) {
            console.log( err );
            return res.send(err);
        }
    	return res.send( sensor);
    });
};

// PUT / id의 정보 갱신
exports.updateSensor = function(req, res) {
    console.log("PUT => Update a sensor: " + req.params.id);

    var conditions = { _id: req.params.id };
    var update = { $set : { switch: req.body.switch} };

    SensorModel.update(conditions, update, function(err, sensor) {
        if (err)
            return res.send(err);
        return res.json({ message: 'Sensor Switch updated ->' + sensor.switch });
    });
};

// DELETE
exports.deleteSensorById = function(req, res) {
	console.log("Deleting a sensor:" + req.params.id);
	return SensorModel.remove( {_id: req.params.id}, function( err, sensor ) {
        if( err ) {
            console.log( err );
            return res.send(err);
        } else {
            return res.json( {message:"ID("+req.params.id+") Successfully deleted!"} );
        }
    });
};
