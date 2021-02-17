var redditData = document.getElementById('reddit-bar');

fetch('https://www.reddit.com/r/wallstreetbets.json', {
})
	.then(function(response) {
		return response.json();
	})
	.then(
		function(data) {
			console.log(data.data.children[0]);
			var i;
			for (i = 0; i < data.data.children.length; i++) {
				redditData.textContent = data.data.children[i].data.title;
			}
		}
	)
;
