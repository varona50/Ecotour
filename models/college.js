var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollegeSchema = new Schema({
    Name: { type: 'String', required: true },
    Desc: { type: 'String', },
    Image: { type: 'String' }
});

var College = mongoose.model('College', CollegeSchema);
module.exports = College;