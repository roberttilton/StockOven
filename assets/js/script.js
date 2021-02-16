const fetch = require("node-fetch");

fetch('https://coinmap.org/api/v1/venues/?query=bitcoin', {})
	.then(function(response) {
		return response.json();
	})
	.then(
		function(data) {
			console.log(data);
		}
	)
;
