const RAPID_API_KEY = "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe";

function fetchStock(userStock) {
	fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=${userStock}&range=1d&region=US`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": RAPID_API_KEY,
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}
		}
	).then(response => response.json())
		.then(data => {
			var candlePoints = [];

			for (let i = 0; i < data.chart.result[0].timestamp.length; i += 5) {
				const timestamp = new Date(data.chart.result[0].timestamp[i] * 1000);

				const close = data.chart.result[0].indicators.quote[0].close[i].toFixed(2);
				const high = data.chart.result[0].indicators.quote[0].high[i].toFixed(2);
				const low = data.chart.result[0].indicators.quote[0].low[i].toFixed(2);
				const open = data.chart.result[0].indicators.quote[0].open[i].toFixed(2);

				candlePoints.push({
					x: timestamp,
					y: [open, high, low, close]
				});
			}

			const containerHeight = document.querySelector("#stock-graph").clientHeight;

			var options = {
				series: [{name: "candle", type: "candlestick", data: candlePoints}],
				chart: {height: containerHeight, type: 'candlestick'},
				title: {text: `${userStock} Stock Chart`},
				xaxis: {type: 'datetime'}
			};

			var chart = new ApexCharts(document.querySelector("#stock-graph"), options);
			chart.render();

			var triggers = document.querySelector(".resize-triggers");
			triggers.parentNode.removeChild(triggers);
			console.log("attempted to remove triggers");
		});

}

fetchStock("AMZN");
