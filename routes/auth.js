const router = require('express').Router();
const passport = require('passport');

// #swagger.tags = ['Auth']
router.get('/login', passport.authenticate('github'));

// #swagger.tags = ['Auth']
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

// #swagger.tags = ['Auth']
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// #swagger.tags = ['Auth']
router.get('/profile', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.status(200).json({
            loggedIn: true,
            username: req.user.username,
            displayName: req.user.displayName
        });
    } else {
        res.status(200).json({ loggedIn: false, message: 'Not logged in.' });
    }
});

module.exports = router;
