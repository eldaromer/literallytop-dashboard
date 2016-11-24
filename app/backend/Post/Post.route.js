module.exports = function (app) {
    var router = app.get('router')();

    var endpoint = app.get('endpoint');

    var AuthLogic = app.get('AuthLogic');

    var models = app.get('models');
    var Model = models.Post;

    var async = app.get('async');

    router.get('/', function (req, res) {

    });

    router.get('/:_id', function (req, res) {
        Model.find( {_id: req.params._id}, function (err, posts) {
            if (posts) {
                res.send(posts[0]);
            } else {
                res.status(404);
                res.send({message: 'Post Does Not Exist'});
            }
            console.log(posts);
        });
    });

    router.post('/create', endpoint.tokenUserIdMatchesParamId(), function(req, res) {
        async.waterfall([
            function (callback) {
                if (!req.body.title) return callback({message: 'Title Required', status: 422});
                if (!req.body.imgSrc) return callback({message: 'Image Source Required', status: 422});
                if (!req.body.content) return callback({message: 'Review Required', status: 422});
                var o = req.body;

                return callback(null, o);
            },
            function(o2, callback) {
                o2._creator = req.user._id;
                var p = new Model(o2);


                return p.save(function(err, post) {
                    if (err) {
                        return callback(err);
                    }



                    callback(null, post);
                });
            }, function (p2, callback) {
                Model
                    .findOne(p2)
                    .populate('_creator')
                    .exec(function (err, post) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, post);
                    });
            }
        ], function (err, post) {
            if (err) {
                console.error(err);
                if(err.status && err.message) {
                    return res.status(err.status).send(err);
                }
                return res.sendStatus(err.status || 500);
            }

            return res.send(post);
        })
    });

    return router;
};