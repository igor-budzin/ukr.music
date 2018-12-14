/**
 * [formatBytes format bytes]
 * @param  {[Integer]} bytes    [description]
 * @param  {[Integer]} decimals [description]
 * @return {[String]}           [formated string]
 */
export function formatBytes(bytes, decimals) {
	if(bytes == 0) return '0 Bytes';
	const k = 1024,
		dm = decimals <= 0 ? 0 : decimals || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * [formatSeconds description]
 * @param  {[Integer]} seconds [description]
 * @return {[String]}         [formated string]
 */
export function formatSeconds(seconds) {
	let string = '';
	let sec_num = parseInt(seconds, 10);
	let hours   = Math.floor(sec_num / 3600);
	let mins = Math.floor((sec_num - (hours * 3600)) / 60);
	let secs = sec_num - (hours * 3600) - (mins * 60);

	if(hours > 0) {
		if(hours < 10) string += hours + ':';
		else string += '0' + hours + ':';
	}
	
	if (mins < 10) string += "0" + mins + ':';
	else string += mins + ':';

	if (secs < 10) string += "0" + secs;
	else string += secs;

	return string;
}