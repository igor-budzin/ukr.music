
module.exports = (app, router, passport) => {

	router.route('/upload-music').post((req, res) => {
		setTimeout(() => {
			res.send("uraaaaaaaa");
		}, 1500);
	});

}


