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
	// Display the file content
	console.log(data);

	//send content to array
	var pokeArray = data.split("\n");

	//call the api querying for posts 
      
	for(var i=0;i<pokeArray.length;i++){ // for each post 
		fetch(url+pokeArray[i])
		.then(function(data){
			console.log(data);
		});
	}


})


//call the api querying for posts 
      
        // for(var i=0;i<pokeArray.length;i++){ // for each post 
        //     fetch(url+pokeArray[i])
		// 	.then(response => response.json())
		// 	.then(json => console.log(json))
		// }

// parse json for "type"


