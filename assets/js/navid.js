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

function drawChart() {
	anychart.data.loadJsonFile("https://cdn.anychart.com/samples/stock-general-features/load-json-data/data.json", function (data) {
        // create stock chart
        var chart = anychart.stock();

        // create data table on loaded data
        var dataTable = anychart.data.table();
        dataTable.addData(data);

        // map loaded data
        var mapping = dataTable.mapAs({'low': 1, 'high': 2});

        // create first plot on the chart with column series
        var plot = chart.plot(0);

        var series = plot.rangeColumn(mapping).name('Temperature');
        series.tooltip()
                .format(function () {
                    return this.seriesName +
                            '<br/><span style="color: #ccc">Max</span>: ' + this.high + '&deg;' +
                            '<br/><span style="color: #ccc">Min</span>: ' + this.low + '&deg;';
                });

        // set grid settings
        plot.yGrid(true)
                .xGrid(true)
                .yMinorGrid(true)
                .xMinorGrid(true);

        // create scroller series with mapped data
        chart.scroller().rangeColumn(mapping);

        // set tooltip settings
        chart.tooltip().useHtml(true);

        // set chart selected date/time range
        chart.selectRange('2007-01-07', '2008-01-06');

        // set container id for the chart
        chart.container('yahoo-top');
        // initiate chart drawing
        chart.draw();

        // create range picker
        var rangePicker = anychart.ui.rangePicker();
        // init range picker
        rangePicker.render(chart);

        // create range selector
        var rangeSelector = anychart.ui.rangeSelector();
        // init range selector
        rangeSelector.render(chart);
    });
}

drawChart();

















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