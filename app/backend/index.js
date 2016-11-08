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
    models.createModel(require('./Post/Post.model')(app));

    //Set Middleware
    router.use(require('./Auth/Auth.middleware')(app).decodeToken);

    //Set Routes
    router.use('/users', require('./User/User.route')(app));
    router.use('/posts', require('./Post/Post.route')(app));
    router.use('/auth', require('./Auth/Auth.route')(app));



    return callback(null, router);
};