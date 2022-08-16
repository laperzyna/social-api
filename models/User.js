const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Mongoose's matching validation
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a valid email address'],
        },
        thoughts: [
            {
                // Array of _id values referencing the Thought model
                type: Schema.Types.ObjectId,
                ref: "Thoughts"
            },
        ],
        friends: [
            {
                // Array of _id values referencing the User model (self-reference)
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

const User = model('User', UserSchema);

module.exports = User;