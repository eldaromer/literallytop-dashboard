module.exports = function (app) {
    var mongoose = app.get('mongoose');
    var Schema = mongoose.Schema;

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
            },
            following : [{ type: Schema.ObjectId, ref: 'User'}]
        },
        populates: []
    }
};