import axios from 'axios';

export default class WebAudioWrapper {
	constructor() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.currentTime = 0;
	}

	loadAudio(link) {
		return new Promise((resolve, reject) => {
			axios({
				method:'get',
				url: 'https://localhost:8080/api/get-music/' + link,
				responseType:'arraybuffer'
			})
			.then((response) => {

				this.audioCtx.decodeAudioData(response.data, (buffer) => {
					this.buffer = buffer;
					console.log("decode");
					resolve();
				}, this.onDecodeBufferError);
				
				// this.decodeBuffer(response.data);
				
			});
		});
	}

	connect = () => {
		console.log("connect")
		this.source = this.audioCtx.createBufferSource();
		this.source.buffer = this.buffer;
		this.source.connect(this.audioCtx.destination);
	}

	stopAudio = () => {
		this.position = this.audioCtx.currentTime;
		this.source.stop(0);
		this.source = null;
		console.log("stop")
	}

	startAudio = () => {
		this.connect();
		this.source.start(0, this.position);
		console.log("start")
	}

	onDecodeBufferError(error) {
		console.log('Error decoding buffer: ' + error.message);
		console.log(error);
	}
}