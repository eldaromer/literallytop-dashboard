module.exports = function (app) {
    var mongoose = app.get('mongoose');

    return {
        name: 'Relationship',
        schema: {
            _follower: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            _following: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        },
        populates: [
            '_follower',
            '_following'
        ]
    }
};