// Reddit sample data
fetch('https://www.reddit.com/r/escapefromtarkov.json', {
})
	.then(function (response) {
		return response.json();
	})
	.then(
		function (data) {
			console.log(data);
		}
	)
	;
// Charts data from yahoo finance api
fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=GME&range=1d&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
	.then(response => {
		console.log(response);
		var chart = document.getElementById('chart-image');
		chart.

	})
	.catch(err => {
		console.error(err);
	});
// historical data from yahoo finance api
fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=AMRN&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	});