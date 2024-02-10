const jwt = require('jsonwebtoken');

/*
function: verifyToken
description: Authentication middleware
*/
function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        const secretKey = process.env.JWT_TOKEN_KEY;
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            jwt.verify(bearerToken, secretKey, (err, user) => {
                if (err) return res.status(401).send('Unauthorized');
                req.user = user;
                next();
            });
        } else {
            console.log("Unauthorized")
            res.status(403).send("Unauthorized");
        }
    } catch (error) {
        console.log("Error inside verifyToken: ", error);
    }
}

module.exports = verifyToken