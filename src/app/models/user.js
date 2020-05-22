const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

// generating a hash
userSchema.methods.generateHash = (candidatePassword) => {
    return bcrypt.hashSync(candidatePassword, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (user, candidatePassword) => {
    if (user.password != null) {
        return bcrypt.compareSync(candidatePassword, user.password);
    } else {
        return false;
    }
};

// create the model for user and expose it to our app
module.exports = mongoose.model('users', userSchema);