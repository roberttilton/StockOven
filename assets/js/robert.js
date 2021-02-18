// declared variable linking to the Reddit div in the HTML
var redditContent = document.getElementById('reddit');
// fetching the data from reddit
fetch('https://www.reddit.com/r/wallstreetbets/hot.json', {})
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
					var redditRedirect = document.createElement('button');
					// post titles parsing
					var redditPosts = document.createElement('h3');
					redditPosts.textContent = data.data.children[i].data.title;
					// username parsing
					var redditUsers = document.createElement('span');
					redditUsers.textContent = data.data.children[i].data.author;
					redditUsers.className = "username";
					// upvote/score parsing
					var redditScore = document.createElement('span');
					redditScore.textContent = data.data.children[i].data.score;
					redditScore.className = "post-score";
					// url parsing, at the moment not utilized
					const link = data.data.children[i].data.permalink;
					// adding the results to the page
					redditRedirect.appendChild(redditUsers);
					redditRedirect.appendChild(redditScore);
					redditRedirect.appendChild(redditPosts);
					redditRedirect.addEventListener("click", function () {
						window.open(`https://www.reddit.com${link}`, "_blank");
					})
					redditRedirect.classList.add("posts");
					redditContent.appendChild(redditRedirect);
				}
			}
		}
	);
