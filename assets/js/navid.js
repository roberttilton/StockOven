var candlePoints = [];

var currentStock = "";
var currentRange = "";
var currentInterval = "";
var stockInput = "";

function renderGraph(range, interval) {
	console.log(`Called renderGraph(range=${range}, interval=${interval})`);

	currentRange = range;
	currentInterval = interval;

	document.querySelector("#stock-graph").innerHTML = "";

	/**
	 * 5 minutes: i++;
	 * 15 minutes: i += 3;
	 * 60 minutes: - += 12;
	 * 1 day : i += 288;
	 */
	const incrementTable  = {
		"5m" : 1,
		"15m" : 3,
		"60m" : 12,
		"1d" : 288
	};

	let filteredData = [];

	for (let i = 0; i < candlePoints.length; i += incrementTable[interval]) {
		const point = candlePoints[i];

		if (range === "1d" && i >= 186) {
			console.log("Short circuiting after one day");
			break;
		}

		filteredData.push(point);
	}

	console.log(`Rendering ${filteredData.length} points`);

	// create an object for the properties of our graph. Based off ApexCharts rubric.
	var options = {
		series: [{
			name: "candle",
			type: "candlestick",
			data: filteredData
		}],
		chart: {
			// height: 300,
			type: 'candlestick',
			zoom: {
				enabled: true,
				type: "xy"
			},
			animations: {
				speed: 50
			}
		},
		title: {text: currentStock + ' Stock Chart', align: 'left'},
		theme: {mode: "dark"},
		xaxis: {type: 'datetime'},
		yaxis: {tickAmount: 10}
	};

	var chart = new ApexCharts(document.querySelector("#stock-graph"), options);
	chart.render();

	try {
		var triggers = document.querySelector(".resize-triggers");
		triggers.parentElement.removeChild(triggers);
	} catch (error) {
		return;
	}
}


async function fetchStock(stockInput) {
	currentStock = stockInput;
	// fetch the stock chart data from the yahoo finance api
	// const backup = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1m&symbol=" + stockInput + "&range=5d&region=US";
	await fetch("sample_responses/sampleResponse.json", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "044818423amsh7a4b9ddcb86f6bdp1a1b13jsn21dfddc15cb3",
			"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
		}
	})

		// convert the response into json
		.then(response => response.json())
		.then(data => {
			// Create a for-loop to grab the values from the response array
			for (let i = 0; i < data.chart.result[0].timestamp.length; i ++) {
				// Grab the timestamps from the response's array & multiply by 1000 since in unix
				const timestamp = new Date(data.chart.result[0].timestamp[i] * 1000);


				try {
					const close = data.chart.result[0].indicators.quote[0].close[i].toFixed(2);
					const high = data.chart.result[0].indicators.quote[0].high[i].toFixed(2);
					const low = data.chart.result[0].indicators.quote[0].low[i].toFixed(2);
					const open = data.chart.result[0].indicators.quote[0].open[i].toFixed(2);

					// set the x and y axis of our graph
					candlePoints.push({
						x: timestamp,
						y: [open, high, low, close]
					});
				} catch (error) {
					continue;
				}
			}

			console.log(`Successfully fetched ${candlePoints.length} data points.`);
		});
}

// call the function
fetchStock("GME").then( (_) => renderGraph("5d", "60m"));

document.querySelectorAll(`#intervals > input[type="radio"]`).forEach(
	button => {
		button.addEventListener("click", function(event) {
			renderGraph(currentRange, event.currentTarget.id);
		});
	}
);

document.querySelectorAll(`#ranges > input[type="radio"]`).forEach(
	button => {
		button.addEventListener("click", function(event) {
			renderGraph(event.currentTarget.id, currentInterval);
		});
	}
);

// fetch a response for the top movers
fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
	// convert the response into json
.then(response => response.json()).then(data => {
	console.log(data);
	var movers = [];
 	// create a for loop to grab from the top movers array
	document.querySelector("#top-movers").innerHTML= "";
	for (let i =0; i<data.finance.result[2].quotes.length; i++){
		const stockName = data.finance.result[2].quotes[i].symbol;
		
		var stockElement = document.createElement("a");
		stockElement.className= "mover-link";
		stockElement.href="https://finance.yahoo.com/quote/"+ stockName +"?p=" + stockName ;
		stockElement.innerText = stockName ;
		document.querySelector("#top-movers").appendChild(stockElement);
	}
})
.catch(err => {
	console.error(err);
});


