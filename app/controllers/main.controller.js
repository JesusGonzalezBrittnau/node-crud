//tell express where to look for static assets (test)
module.exports = {
    showHome: (req, res) => {
        res.render('pages/home');
    }
};