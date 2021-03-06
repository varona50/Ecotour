var express = require('express');
var router = express.Router();
var Country = require('../models/country');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET countries page. */
router.get('/countries', function(req, res, next) {
    res.render('countries', { title: 'Ajax Demo', layout: 'layout1' });
});

router.get("/setup-db", function(req, res) {
    var countries = [{
            Name: "Україна",
            Desc: "Держава, розташована в Східній та частково Центральній Європі, у південно-західній частині Східноєвропейської рівнини. Площа становить 603 628 км². Найбільша за площею країна з тих, чия територія повністю лежить у Європі[5], друга на європейському континенті, якщо враховувати Росію. Межує з Білоруссю на півночі, Польщею, Словаччиною та Угорщиною — на заході, Румунією та Молдовою — на південному заході, Росією на сході і північному сході. На півдні і південному сході омивається Чорним і Азовським морями.",
            Image: "/images/ukraine.png"
        },
        {
            Name: "Росія",
            Desc: "Держава у північній Євразії, федеративна змішана республіка, столиця — Москва. З площею 17 098 246 км²[5] Росія є найбільшою за територією країною у світі, що охоплює більше однієї восьмої площі суходолу Землі та дев'ятою за чисельністю населення із населенням 143 мільйони осіб (2015[6]).",
            Image: "/images/russia.png"
        },
        {
            Name: "Мексика",
            Desc: "Країна в Північній Америці, яка межує на півночі зі Сполученими Штатами Америки, на півдні з Гватемалою, Белізом. Мексика також омивається на заході Тихим океаном, на південному сході Карибським морем та на сході Мексиканською затокою. Мексиканські Сполучені Штати — федеративна конституційна республіка, яка складається з 31-го штату та одного федерального округу навколо столиці м. Мехіко.",
            Image: "/images/mexico.png"
        },
        {
            Name: "Швеція",
            Desc: "Держава в Північній Європі на Скандинавському півострові. Межує з Норвегією та Фінляндією, також з'єднана з Данією мостом-тунелем через протоку Ересунн. Займаючи територію у 450 295 км², Швеція є третьою за площею країною Європейського Союзу, і має населення чисельністю 10 мільйонів осіб.",
            Image: "/images/sweden.png"
        },
        {
            Name: "Англія",
            Desc: "Країна в Західній Європі, що входить до Сполученого королівства Великої Британії та Північної Ірландії. Найбільша за площею і населенням з чотирьох країн Сполученого королівства та трьох частин Великої Британії. Межує з двома іншими частинами Великої Британії — Уельсом на заході і Шотландією на півночі в межах острова Велика Британія. Назва країни походить від назви племені англів, одного з германських племен, що оселились тут у V і VI століттях[1].",
            Image: "/images/england.png"
        },
        {
            Name: "Бразилія",
            Desc: "Держава в Південній Америці, що межує на південному заході з Уругваєм, Аргентиною, Парагваєм і Болівією, на заході з Перу і Колумбією, на півночі з Венесуелою, Гаяною, Суринамом і Французькою Гвіаною, на сході омивається Атлантичним океаном.",
            Image: "/images/brazil.png"
        }
    ];

    Country.remove({}, function(err) {
        if (err) {
            console.error(err);
        } else {
            for (let i = 0; i < countries.length; i++) {
                Country.create(countries[i], function(err, c) {
                    if (err)
                        console.error('Error:' + err);
                    else
                        console.log(c);
                });
            };

        };
    });

    res.status(200).json({
        message: "Okay",
    });
});

/* GET prices page. */
router.get('/prices', function(req, res, next) {
    res.render('prices', { title: 'Express3' });
});

/* GET contacts page. */
router.get('/contacts', function(req, res, next) {
    res.render('contacts', { title: 'Contacts Us' });
});

router.post('/contacts', function(req, res, next) {
    //відправка листа //експериментувати з полем TO. дві адреси.
    var message = {
        from: req.body.email,
        to: 'mrakus30@gmail.com',
        subject: 'Message from Ecotour [' + req.body.name + ']',
        text: req.body.message,
        html: '<p>' + req.body.message + '</p>'
    };
    console.log(message);
    if (req.body.human === "5") {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "mrakus900@gmail.com",
                pass: ""
            }
        });
        // send mail with defined transport object
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log(info);
            res.render('contacts-res', { title: 'Contacts:', message: "Лист віправлено!" })
        });

    } else {
        res.render('contacts-res', { title: 'Contacts Us', message: "Ви мабуть робот!" });
    }
});

module.exports = router;