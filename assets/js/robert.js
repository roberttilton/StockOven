// declared variable linking to the Reddit div in the HTML
var redditContent = document.getElementById('reddit');
// fetching the data from reddit
fetch('sample_responses/sample_reddit_response.json', {})
	.then(function (response) {
		return response.json();
	})
	.then(
		// function that parses the returned array and applies it where necessary
		function (data) {
			console.log(redditContent);
			console.log(data.data.children[0]);
			for (var i = 0; i < data.data.children.length; i++) {
				if ((data.data.children[i].data.score) > 500) {
					var redditRedirect = document.createElement('button');
					redditRedirect.className = "reddit-post";

					// post titles parsing
					var redditPosts = document.createElement('p');
					redditPosts.textContent = data.data.children[i].data.title;
					redditPosts.className = "post-title";

					// username parsing
					var redditUsers = document.createElement('span');
					redditUsers.textContent = data.data.children[i].data.author;
					redditUsers.className = "post-author";

					// upvote/score parsing
					var redditScore = document.createElement('span');
					redditScore.textContent = data.data.children[i].data.score;
					redditScore.className = "post-score";

					// url parsing, at the moment not utilized
					const link = data.data.children[i].data.permalink;

					// adding the results to the page
					redditRedirect.appendChild(redditPosts);
					redditRedirect.appendChild(redditUsers);
					redditRedirect.appendChild(redditScore);

					redditRedirect.addEventListener("click", function () {
						window.open(`https://www.reddit.com${link}`, "_blank");
					})

					// redditRedirect.classList.add("posts");
					redditContent.appendChild(redditRedirect);
				}
			}
		}
	);
