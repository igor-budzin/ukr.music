const AWS = require('aws-sdk')
const awsConfig = require('../../config/AWS.config');

module.exports = (router) => {
	router.get('/getAudioFile/:link', (req, res) => {
		let s3 = new AWS.S3({
			accessKeyId: awsConfig.accessKeyId,
			secretAccessKey: awsConfig.secretAccessKey
		});

		s3.listObjectsV2({MaxKeys: 1, Bucket: awsConfig.backetName, Prefix: req.params.link}, function(err, data) {
				if (err) {
						return res.sendStatus(404); 
				}

				if (req != null && req.headers.range != null) {
						const range = req.headers.range;
						const bytes = range.replace(/bytes=/, '').split('-');
						const start = parseInt(bytes[0], 10);

						const total = data.Contents[0].Size;
						const end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
						const chunksize = (end - start) + 1;

						res.writeHead(206, {
							'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
							'Accept-Ranges': 'bytes',
							'Content-Length': chunksize,
							'Content-Type': 'audio/mpeg'
						});

						s3.getObject({Key: req.params.link, Bucket: awsConfig.backetName, Range: range}).createReadStream().pipe(res);
				}
				else {
						res.writeHead(200, {
								'Cache-Control': 'max-age=' + cache + ', private',
								'Content-Length': data.Contents[0].Size,
								'Content-Type': 'audio/mpeg' 
						});
						s3.getObject({Key: req.params.link, Bucket: awsConfig.backetName}).createReadStream().pipe(res);
				}
		});

	});
}