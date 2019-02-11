const AWS = require('aws-sdk')
const awsConfig = require('../../config/AWS.config');

module.exports = (router) => {
	router.get('/getAudioFile/:link', (req, res) => {
		let s3 = new AWS.S3({
			accessKeyId: awsConfig.accessKeyId,
			secretAccessKey: awsConfig.secretAccessKey
		});

		// res.attachment(req.params.link);
		// let fileStream = s3.getObject({ Bucket: awsConfig.backetName, Key: req.params.link }).createReadStream().pipe(res, { end: true });

		s3.listObjectsV2({MaxKeys: 1, Bucket: awsConfig.backetName, Prefix: req.params.link}, function(err, data) 
		{
			console.log(data.Contents)
				if (err) { 
						return res.sendStatus(404); 
				}

				if (req != null && req.headers.range != null) {
						var range = req.headers.range;
						var bytes = range.replace(/bytes=/, '').split('-');
						var start = parseInt(bytes[0], 10);

						var total = data.Contents[0].Size;
						var end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
						var chunksize = (end - start) + 1;

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