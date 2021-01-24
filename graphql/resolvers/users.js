const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(
            _, 
            { registerInput: { username, email, password, confirmPassword }}, 
            context, 
            info
            ) {
            // TODO: Validate user data
            // TODO: Make sure user doesnt alredy exist
            // TODO: hash passsword and reate an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
}