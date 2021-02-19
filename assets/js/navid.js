function fetchStock(stockInput) {
	// fetch the stock chart data from the yahoo finance api
	const backup = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=" + stockInput + "&range=1d&region=US";
	fetch("sample_responses/sample_yahoo_response.json", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}
		})
		// convert the response into json
		.then(response => response.json())
		.then(data => {
			var candlePoints = [];
				// Create a for-loop to grab the values from the response array
			for (let i = 0; i < data.chart.result[0].timestamp.length; i += 5) {
				// Grab the timestamps from the response's array & multiply by 1000 since in unix
				const timestamp = new Date(data.chart.result[0].timestamp[i] * 1000);

				const close = data.chart.result[0].indicators.quote[0].close[i];
				const high = data.chart.result[0].indicators.quote[0].high[i];
				const low = data.chart.result[0].indicators.quote[0].low[i];
				const open = data.chart.result[0].indicators.quote[0].open[i];
				// set the x and y axis of our graph
				candlePoints.push({
					x: timestamp,
					y: [open, high, low, close]
				});
			}

			console.log(candlePoints);
			// create an object for the properties of our graph. Based off ApexCharts rubric.
			var options = {
				series: [{
					name: "candle",
					type: "candlestick",
					data: candlePoints
				}],
				chart: {
					height: 300,
					type: 'candlestick'
				},
				title: {text: 'Stock Chart',align: 'left'},
				theme: {mode: "dark"},
				xaxis: {type: 'datetime'}
			};

			var chart = new ApexCharts(document.querySelector("#stock-graph"), options);
			chart.render();
		});
}

// call the function
fetchStock("GME");

// fetch a response for the top movers
// fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=5", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
// 	}
// })
// 	// convert the response into json
// .then(response => response.json()).then(data => {
// 	console.log(data);
// 	var movers = [];
// 	// create a for loop to grab from the top movers array
// 	for (let i =0; i<data.finance.result[2].quotes.length; i++){
// 		const stockName = data.finance.result[2].quotes[i].symbol;
		
// 		var stockElement = document.createElement("div");
// 		stockElement.innerText = stockName ;
// 		document.querySelector("#top-movers").appendChild(stockElement);
// 	}
// })
// .catch(err => {
// 	console.error(err);
// });
