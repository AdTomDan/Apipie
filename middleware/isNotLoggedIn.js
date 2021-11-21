function isNotLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		res.redirect('/auth');
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;
