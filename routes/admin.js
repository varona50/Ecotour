var express = require('express');
var router = express.Router();
var College = require('../models/college');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Виводим меню адміна
    res.render('admin/index', {
        layout: 'admin/layout',
        title: 'Admin Panel'
    });
});

router.get('/colleges', function(req, res, next) {
    College.find({}, function(err, colleges) {
        if (err) {
            console.error('Error: ' + err);
            res.render('admin/college-res', {
                title: 'Error І',
                message: err
            });
        } else {
            res.render('admin/colleges', {
                layout: 'admin/layout',
                title: 'Add college',
                colleges: colleges
            });
        }
    });
});

router.get('/college-add', function(req, res, next) { //Додати коледж    
    res.render('admin/college-add', {
        layout: 'admin/layout',
        title: 'Add college'
    });
});

router.post('/college-add', function(req, res) { //Результат додавання коледж
    College.remove({ Name: req.body.collegeName }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/college-res', { title: 'Error', message: err });
        } else {
            Country.create({
                Name: req.body.CollegeName,
                Desc: req.body.collegeDescription,
                Image: req.body.imageURL,
            }, function(err, college) {
                if (err) {
                    console.error('Error: ' + err);
                    res.render('admin/college-res', { title: 'Error І', message: err });
                } else
                    res.render('admin/college-res', {
                        title: 'Super: ',
                        message: 'College added to DB succesfully'
                    });
            });
        }
    });
});

module.exports = router;