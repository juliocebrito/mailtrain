'use strict';

const users = require('../models/users');
const router = require('../lib/router-async').create();
const crypto = require('crypto');
const knex = require('../lib/knex');
const passport = require('../lib/passport');


router.postAsync('/api-get-token', async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await users.getByUsernameIfPasswordMatch(username, password);
        const token = await users.getAccessToken(user.id);

        res.status(200);
        res.json({
            data: {
                token: token
            }
        });
    } catch (error) {
        throw new Error(error);
    }
});

router.getAsync('/api-reset-token/:userId', passport.authByAccessToken, passport.loggedIn, async (req, res) => {

    try {
        const userId = req.params.userId;
        const token = crypto.randomBytes(20).toString('hex').toLowerCase();
        await knex('users').where({id: userId}).update({access_token: token});

        res.status(200);
        res.json({
            data: {
                token: token
            }
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = router;