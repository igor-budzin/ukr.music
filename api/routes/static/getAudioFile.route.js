const AWS = require('aws-sdk')
const awsConfig = require('../../config/AWS.config');

module.exports = (router) => {
	router.get('/getAudioFile/:link', (req, res) => {
		let s3 = new AWS.S3({
			accessKeyId: awsConfig.accessKeyId,
			secretAccessKey: awsConfig.secretAccessKey
		});

		res.attachment(req.params.link);
		let fileStream = s3.getObject({ Bucket: awsConfig.backetName, Key: req.params.link }).createReadStream();

		fileStream.on('close', () => {
			res.end()
		});

		fileStream.pipe(res);
	});
}