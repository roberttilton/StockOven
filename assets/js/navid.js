// Reddit sample data
fetch('https://www.reddit.com/r/wallstreetbets.json', {
})
	.then(function (response) {
		return response.json();
	})
	.then(
		function (data) {
			console.log(data);
		}
	);






fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=HYDR.ME&interval=5m&range=1d&region=US&comparisons=%5EGDAXI%2C%5EFCHI", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(data => {
	console.log(data);
});

// var options = {
// 	series: [{
// 		name: 'stockOven',
// 		type: 'candlestick',
// 		data:[{
// 			x:
// 			y:
// 		}]
// 	}]
// }
	
	
// drawChart();

















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



	// Top movers from yahoo finance api
fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=6", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "49c262adb7msh32c74269c34335fp14ab31jsn4366026eeabe",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
	.then(response => {
	return response.json()
	})
	.then(data =>{
	console.log(data)
	})
	.catch(err => {
	console.error(err);
	});