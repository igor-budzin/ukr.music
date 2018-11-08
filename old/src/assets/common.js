function ready(fn) {
	if(document.readyState != 'loading'){
		fn();
	}
	else if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn);
	}
	else {
		document.attachEvent('onreadystatechange', function() {
		if(document.readyState != 'loading')
			fn();
		});
	}
}

ready(function() {
	var links = document.querySelectorAll('.filter-dropdown .link');

	Array.prototype.forEach.call(links, function(link) {
		link.addEventListener('click', function(event) {
			event.preventDefault();

			if(this.parentNode.classList.contains('open')) {
				this.parentNode.classList.remove('open');
			}
			else {
				Array.prototype.forEach.call(links, function(link) {
					link.parentNode.classList.remove('open');
				});
				this.parentNode.classList.add('open');
			}
		});
	});
});
