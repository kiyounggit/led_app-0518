var express = require('express');
var router = express.Router();
var sensormodel = require('./sensormodel');

/* GET home page. */
router.route('/sensors/list')        // Sensor models
    .get( sensormodel.getSensors )
    ;
router.route('/sensors')        // Browser Query
    .get( sensormodel.getAllSensors )
    .post( sensormodel.addSensor )
    ;


router.route('/sensors/:id')      // Python query
    .get( sensormodel.getSensorById)
    .put( sensormodel.updateSensor)
    .delete(sensormodel.deleteSensorById)
    ;


// router.route('/sensors/:device/:id')      // Python query
//     .get( sensormodel.getSensorById)
//     .put( sensormodel.updateSensor)
//     ;
module.exports = router;
