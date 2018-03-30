var express = require('express');
var router = express.Router();
var Country = require('../models/country');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Виводим меню адміна
    res.render('admin/index', {
        layout: 'admin/layout',
        title: 'Admin Panel'
    });
});

router.get('/countries', function(req, res, next) {
    Country.find({}, function(err, countries) {
        if (err) {
            console.error('Error: ' + err);
            res.render('admin/country-res', {
                title: 'Error І',
                message: err
            });
        } else {
            res.render('admin/countries', {
                layout: 'admin/layout',
                title: 'Add country',
                countries: countries
            });
        }
    });
});

router.get('/countries-add', function(req, res, next) { //Додати країну    
    res.render('admin/countries-add', {
        layout: 'admin/layout',
        title: 'Add country'
    });
});

router.post('/countries-add', function(req, res) { //Результат додавання країни
    Country.remove({ Name: req.body.countryName }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/country-res', { title: 'Error', message: err });
        } else {
            Country.create({
                Name: req.body.CountryName,
                Desc: req.body.countryDescription,
                Image: req.body.imageURL,
            }, function(err, country) {
                if (err) {
                    console.error('Error: ' + err);
                    res.render('admin/country-res', { title: 'Error І', message: err });
                } else
                    res.render('admin/country-res', {
                        title: 'Super: ',
                        message: 'Country added to DB succesfully'
                    });
            });
        }
    });
});

module.exports = router;