

module.exports = {
	'facebookAuth': {
		'clientID': '304756016833386',
		'clientSecret': '53b1629d29c4d49b92d643339a70a030',
		'callbackURL': 'https://localhost:8080/api/auth/facebook/callback'
	},

	'googleAuth': {
		'clientID': '34291355924-ssaq4ot14uplovdqjao9r4oncj0c3ml1.apps.googleusercontent.com',
		'clientSecret': 'U7AIoJU0Dw-7-jWKiBxLmFM2',
		'callbackURL': 'http://localhost:8080/api/auth/google/callback'
	},

	'jwt': {
		'secretOrKey': 'cabinsecret',
		'issuer': 'auth.cabin.com',
		'audience': 'cabin.com',
		'expires': '2 days'
	}
};