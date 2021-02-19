// declared variable linking to the Reddit div in the HTML
var redditContent = document.getElementById('reddit');
var redditDD = [];
var redditGain = [];
var redditLoss = [];
var redditNews = [];
var redditYolo = [];
var postObject = {
	"DD": redditDD,
	"Gain": redditGain,
	"Loss": redditLoss,
	"News": redditNews,
	"YOLO": redditYolo
};

function renderReddit(flair) {
	redditContent.innerHTML = "";

	if (postObject[flair].length === 0) {
		console.log("No posts found");

		var deadFlair = $(`<div class="no-reddit">`).get()[0];
		deadFlair.setAttribute("data-dead-flair", `No posts found for flair '${flair}'`)

		redditContent.appendChild(deadFlair);
		return;
	}

	for (const post of postObject[flair]) {
		redditContent.appendChild(post);
	}
}

// fetching the data from reddit
fetch('https://www.reddit.com/r/wallstreetbets/top.json', {})
	.then(function (response) {
		return response.json();
	})
	.then(
		// function that parses the returned array and applies it where necessary
		function (data) {
			// console.log(redditContent);
			// console.log(data.data.children[0]);
			for (var i = 0; i < data.data.children.length; i++) {
				var redditRedirect = document.createElement('button');
				// post titles parsing
				var redditPosts = document.createElement('p');
				redditPosts.textContent = data.data.children[i].data.title;
				// username parsing
				var redditUsers = document.createElement('span');
				redditUsers.textContent = data.data.children[i].data.author;
				// upvote/score parsing
				var redditScore = document.createElement('span');
				// redditScore.textContent = data.data.children[i].data.score;
				// url parsing, to add permalink to the clickable link functionality
				const link = data.data.children[i].data.permalink;
				// adding the results to the page
				redditRedirect.appendChild(redditPosts);
				redditRedirect.appendChild(redditUsers);
				redditRedirect.appendChild(redditScore);
				redditRedirect.addEventListener("click", function () {
					// window.location.href = `https://www.reddit.com${link}`;
					window.open(`https://www.reddit.com${link}`, "_blank");
					// console.log(link);
				});
				redditRedirect.classList.add("reddit-post");
				redditPosts.classList.add("post-title");
				redditUsers.classList.add("post-author");
				redditScore.classList.add("post-score");
				// redditContent.appendChild(redditRedirect);
				var upvote = document.createElement("i");
				upvote.className = "fas fa-arrow-up";
				redditScore.appendChild(upvote);
				redditScore.append(data.data.children[i].data.score);
				var currentFlair = data.data.children[i].data.link_flair_text;
				// console.log(currentFlair);
				if (Object.keys(postObject).includes(currentFlair)) {
					postObject[currentFlair].push(redditRedirect);
				}
			}
			// console.log(redditNews);
		}
	);

document.querySelectorAll(".sort-button").forEach(button => {
	button.addEventListener("click", function (event) {
		event.preventDefault();
		// console.log(event.currentTarget.innerHTML);
		renderReddit(event.currentTarget.innerHTML);
	})
})
