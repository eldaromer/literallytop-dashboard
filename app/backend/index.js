module.exports = function (app, callback) {
    //Get Router
    var router = app.get('router')();

    //Get Mongo Provider
    var mongo = require('./Providers/mongo')(app);
    app.set('mongo', mongo);

    //Get Models.js file
    var models = require('./models')(app);
    app.set('models', models);

    //Get Auth Logic
    var AuthLogic = require('./Auth/Auth.logic')(app);
    app.set('AuthLogic', AuthLogic);

    //Get endpoint Template
    var endpoint = require('./endpoint')(app);
    app.set('endpoint', endpoint);

    //Create Models
    models.createModel(require('./User/User.model')(app));

    //Set Routes
    router.use('/users', require('./User/User.route')(app));



    return callback(null, router);
};