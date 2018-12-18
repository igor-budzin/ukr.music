

module.exports = {
	'facebookAuth' : {
		'clientID'      : '737416706611800',
		'clientSecret'  : '2d07d330cdf3947e68e97275a74e189a',
		'callbackURL'   : 'https://localhost:8080/api/auth/facebook/callback',
		'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
		'profileFields' : ['id', 'email', 'name']
	},

	'googleAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:8080/auth/google/callback'
	}
};