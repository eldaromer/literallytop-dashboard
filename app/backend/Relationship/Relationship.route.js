module.exports = function (app) {
    var router = app.get('router')();

    var endpoint = app.get('endpoint');

    var AuthLogic = app.get('Authlogic');

    var models = app.get('models');
    var Model = models.Relationship;

    var async = app.get('async');

    router.get('/', function (req, res) {

    });

    router.post('/create', endpoint.tokenUserIdMatchesParamId(), function (req, res) {

    });

    return router;
};