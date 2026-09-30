// Creates the JWT a company uses to call protected /api/company routes.
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

}

export default generateToken;