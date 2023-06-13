const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/', (req, res) => {
    res.send("<a href='/auth/google'> Authenticate with Google: </a>")
});

router.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile'] })
);

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/api-docs',
        failureRedirect: '/auth/failure'
    })
)

router.get('/auth/failure', (req, res) => {
    res.send('Something went wrong.')
})

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

    req.session.destroy()
    res.send('Goodbye')
});

module.exports = router;