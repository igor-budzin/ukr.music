const mysql = require('mysql');

module.exports = () => {
	return function handleConnect() {
		const db_config = {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'map-routes'
		};

		let connection;

		connection = mysql.createConnection(db_config);

		connection.connect(function(err) {
			console.log('DB connected');
			if(err) {
				console.log('error when connecting to db:', err);
				setTimeout(handleConnect, 2000);
			}
		});

		connection.on('error', function(err) {
			console.log('db error', err);
			if(err.code === 'PROTOCOL_CONNECTION_LOST') {
				handleConnect();
			}
			else {
				throw err;
			}
		});

		return connection;
	}
}