//tell express where to look for static assets
module.exports = {
    showHome: (req, res) => {
        res.render('pages/home');
    }
};