const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    getToken: (req) => {
        return req.headers.authorization.replace("Bearer ", '');
    },
    isLogin: (req, res, next) => {
        const token = module.exports.getToken(req);
        const secret = process.env.secret;

        if (!token) {
            res.statusCode = 401;
            return res.send("Authorization token not provided");
        }

        try {
            const verify = jwt.verify(token, secret);
            if (verify) {
                return next();
            }
        } catch (e) {
            res.statusCode = 401;
            return res.send("Unauthorized");
        }

        res.statusCode = 401;
        return res.send("Authorization failed");
    },
    getMemberID: async (req) => {
        const token = req.headers.authorization.replace("Bearer ", '');
        const payload = jwt.decode(token);
        return payload.id;
    }
};
