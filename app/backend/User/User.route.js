module.exports = function (app) {
    var router = app.get('router')();

    var endpoint = app.get('endpoint');

    var models = app.get('models');
    var Model = models.User;
    var Post = models.Post;

    var async = app.get('async');

    var userValidator = function (req) {
        if (!req.user) {
            return false;
        }
        return req.user._id === req.params.id;
    };

    router.get('/:id', endpoint.auth(userValidator),endpoint.read(Model, Model.populates, null, endpoint.userOutputMiddleware));

    router.get('/:_creator/posts', endpoint.readChildren(Post, '_creator', Post.populates));

    router.post('/signup', function (req, res) {
        async.waterfall([
            function (callback) {
                if (!req.body.username) return callback({message: 'Username Required', status: 422});
                if (!req.body.password) return callback({message: 'Password Required', status: 422});
                return(callback(null));
            },
            function (callback) {
                var o = req.body;

                return endpoint.hashPasswordMiddleware(o, function (err, o2) {
                    if (err) return callback(err);
                    return callback(null, o2);
                });
            },
            function (o2, callback) {
                var u = new Model(o2);

                return u.save(function (err, user) {
                    if (err) {
                        if (err.code === 11000) {
                            return callback({
                                message: 'Duplicate user',
                                status: 422
                            })
                        }
                        return callback(err);
                    }
                    callback(null, user);
                });
            },
            function (user, callback) {
                endpoint.userOutputMiddleware(user, callback);
            }
        ], function (err, user) {
            if (err) {
                console.error(err);
                if(err.status && err.message) {
                    return res.status(err.status).send(err);
                }
                return res.sendStatus(err.status || 500);
            }

            return res.send(user);
        });
    });

    return router;
};