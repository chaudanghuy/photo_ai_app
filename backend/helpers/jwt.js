const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET_KEY;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/accounts/login`
        ]
    });
}

async function isRevoked(req, payload) {
    if (payload.isAdmin == false) {
        return true;
    }
    return false;
}

module.exports = authJwt;