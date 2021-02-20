// fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=AMRN&range=1d&region=US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "044818423amsh7a4b9ddcb86f6bdp1a1b13jsn21dfddc15cb3",   //Grabs the Yahoo finance API
// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });


fetch("assets/txt/stock_symbols.txt")
	.then(response => response.text())
	.then(
		data => {
			// Variable created for all US stock names
			var stockNames = data.split(",");

			$("#search").autocomplete({
				source: stockNames
			});

			var searchButton = document.querySelector("#button"); //Variable to create search button

			searchButton.addEventListener("click", function (event) { //Function for when the search button is clicked, the program reads the stock chosen and displays the corresponding stock chart grabbed from yahoo finance api
				event.preventDefault();
				var stockSearch = document.querySelector("#search").value;
				console.log(stockSearch)
				fetchStock(stockSearch);
			});
		}
	)
;
