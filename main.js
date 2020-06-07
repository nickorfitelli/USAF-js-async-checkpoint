// Create a command line application that processes a file list of pokemon names (each name seperated by a new line)
// and logs each Pokemon's types (for some there are many) according to the pokeapi.co API.

// This is an assessment of both your understanding of the course material so far and your ability to independently
//  problem solve and use the internet/other resources to implement anything you don't understand.

var url = "https://pokeapi.co/api/v2/pokemon/"; //API GET https://pokeapi.co/api/v2/type/{id or name}/

const fetch = require("node-fetch");

// Include fs module
var fs = require("fs");

// Use fs.readFile() method to read the file
fs.readFile("input.txt", "utf8", function (err, data) {
	//Pass in an interable (pokemon with types)
	Promise.all(
		data
			.toString() 				//take input and convert to string
			.split("\n") 				//split input by newline \n
			.map((pokemon) => { 		//take the data and fetch each pokemon
				return (
					fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.trim()}`)
						.then((result) => {
							if (result.ok) {
								return result.json();
							} else {
								throw new Error(`Error cannot find ${pokemon}`);
							}
						})

						//take results of the fetch and map types out
						.then((pokemonRecieved) => {
							return `${pokemon}: ${pokemonRecieved.types
								.map((x) => x.type.name)
								.join(", ")}`;
						})

						//catch any errors and send back error msg
						.catch((error) => {
							return `${error.message}`;
						})
				);
			}) //END OF THE MAPPING
	) //END OF PROMISE.ALL

		//console log the results for each array in pokemonRecieved
		.then((results) => {
			results.forEach((element) => {
				console.log(element);
			});
		})
		//catch any errors and log
		.catch((error) => {
			console.log(error);
		});
});
