fetch('https://www.reddit.com/r/escapefromtarkov.json', {
})
	.then(function(response) {
		return response.json();
	})
	.then(
		function(data) {
			console.log(data);
			var redditData = document.getElementById('reddit-bar');
			redditData.textContent = JSON.stringify(data);
		}
	)
;