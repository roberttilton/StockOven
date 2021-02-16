fetch('https://www.reddit.com/r/wallstreetbets.json', {
})
	.then(function(response) {
		return response.json();
	})
	.then(
		function(data) {
			var redditData = document.getElementById('reddit-bar');
			console.log(data.data.children[0]);
			var i;
			for (i = 0; i <= 5; i++) {
				redditData.textContent = JSON.stringify(data.data.children[i]);
			}
			// data.after.children[12]
		}
	)
;