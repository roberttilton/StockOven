// declared variable linking to the Reddit div in the HTML
var redditContent = document.getElementById('reddit-content');
// fetching the data from reddit
fetch('https://www.reddit.com/r/wallstreetbets/hot.json', {
})
	.then(function (response) {
		return response.json();
	})
	// function that parses the returned array and applies it where necessary
	.then(
		function (data) {
			console.log(redditContent);
			console.log(data.data.children[0]);
			for (var i = 0; i < data.data.children.length; i++) {
				if ((data.data.children[i].data.score) > 500) {
					// post titles parsing
					var redditPosts = document.createElement('h3');
					redditPosts.textContent = data.data.children[i].data.title;
					// username parsing
					var redditUsers = document.createElement('h3');
					redditUsers.textContent = data.data.children[i].data.author;
					// upvote/score parsing
					var redditScore = document.createElement('h3');
					redditScore.textContent = data.data.children[i].data.score;
					// url parsing, at the moment not utilized
					var redditURL = document.createElement('h3');
					redditURL.textContent = data.data.children[i].data.url;
					// adding the results to the page
					redditContent.appendChild(redditPosts);
					redditContent.appendChild(redditUsers);
					redditContent.appendChild(redditScore);
				}
			}
		}
	)
	;
