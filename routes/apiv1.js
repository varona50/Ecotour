var express = require('express');
var router = express.Router();
var countryController = require('../controllers/countryController.js');

// router.get('/countries', function(req, res, next) {
//     Country.find({}, function(err, countries) {
//         if (err) {
//             console.error('Error: ' + err);
//             res.status(500).json({ message: err });
//         } else {
//             res.status(200).json(countries);
//         }
//     });
// });

router.get('/countries', countryController.all);

router.route('/country/:countryId')
    .get(countryController.read)
    .put(countryController.update)
    .delete(countryController.delete);

module.exports = router;