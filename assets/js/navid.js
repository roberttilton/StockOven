function fetchStock(stockInput) {
	fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=" + stockInput + "&range=1d&region=US", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
			}
		})
		.then(response => response.json())
		.then(data => {
			var candlePoints = [];

			for (let i = 0; i < data.chart.result[0].timestamp.length; i += 5) {
				const timestamp = new Date(data.chart.result[0].timestamp[i] * 1000);

				const close = data.chart.result[0].indicators.quote[0].close[i];
				const high = data.chart.result[0].indicators.quote[0].high[i];
				const low = data.chart.result[0].indicators.quote[0].low[i];
				const open = data.chart.result[0].indicators.quote[0].open[i];

				candlePoints.push({
					x: timestamp,
					y: [open, high, low, close]
				});
			}

			console.log(candlePoints);

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


fetchStock("GME");


fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(response => response.json()).then(data => {
	console.log(data);
	var movers = [];
	for (let i =0; i<data.finance.result[2].quotes.length; i++){
		const stockName = data.finance.result[2].quotes[i].symbol;
		
		var stockElement = document.createElement("div");
		stockElement.innerText = stockName ;
		document.querySelector("#top-movers").appendChild(stockElement);
	}
})
.catch(err => {
	console.error(err);
});