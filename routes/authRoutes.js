const passport = require('passport');
module.exports = (app)=>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res)=>{
            console.log(req);
            const googleId = req.user.googleId;
            res.redirect(`http://localhost:3000/?googleId=${googleId}`);
        }
    );

    app.get('/api/logout', (req,res)=>{
        req.logout();
        res.redirect('http://localhost:3000');
    })

    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    })
}

