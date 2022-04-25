
const jwt = require('jsonwebtoken');

// create jwt token upon user signin
const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, 
    'thisissecret',
    {
        expiresIn: '30d'
    });
};

module.exports = {generateToken};
