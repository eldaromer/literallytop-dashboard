module.exports = function (app) {
    var mongoose = app.get('mongoose');

    return {
        name: 'Post',
        schema: {
            _creator: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            imgSrc: {
                type: String
            }
        },
        populates: [
            '_creator'
        ]
    }
};