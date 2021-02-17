var redditContent = document.getElementById('reddit-content');

fetch('https://www.reddit.com/r/wallstreetbets/hot.json', {
})
	.then(function(response) {
		return response.json();
	})
	.then(
		function(data) {
			console.log(redditContent);
			console.log(data.data.children[0]);
			for (var i = 0; i < data.data.children.length; i++) {
				if ((data.data.children[i].data.score) > 500) {
					var redditPosts = document.createElement('h3');
					redditPosts.textContent = data.data.children[i].data.title;
					var redditUsers = document.createElement('h3');
					redditUsers.textContent= data.data.children[i].data.author;
					var redditScore = document.createElement('h3');
					redditScore.textContent= data.data.children[i].data.score;
					var redditURL = document.createElement('h3');
					redditURL.textContent= data.data.children[i].data.url;
					redditContent.appendChild(redditPosts);
					redditContent.appendChild(redditUsers);
					redditContent.appendChild(redditScore);
				}
			}
		}
	)
;
