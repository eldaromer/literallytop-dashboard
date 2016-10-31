module.exports = function (app, callback) {
    var router = app.get('router')();

    var mongo = require('./Providers/mongo')(app);
    app.set('mongo', mongo);

    var models = require('./models')(app);
    app.set('models', models);



    return callback(null, router);
};