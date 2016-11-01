module.exports = function (app) {
    var mongoose = app.get('mongoose');

    return {
        name: 'User',
        schema: {
            username : {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            passwordHash : {
                type: String,
                required: true
            }
        },
        populates: []
    }
};