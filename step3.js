const fs = require("fs");
const argv = process.argv;
const validUrl = require("valid-url");
const axios = require("axios");

function cat(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			myWrite(data);
		}
	});
}

async function webCat(url) {
	axios
		.get(url)
		.then((res) => {
			myWrite(res.data);
		})
		.catch((err) => {
			console.error(`Error fetching ${url}:`);
			console.error(err.message);
		});

	// try {
	// 	let res = await axios.get(url).data;
	// 	myWrite(res.data);
	// } catch (err) {
	// 	console.error(`Error fetching ${url}:`);
	// 	console.error(err.message);
	// }
}

function myWrite(input) {
	if (out) {
		fs.writeFile(out, input, "utf-8", (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			console.log("done");
		});
	} else {
		console.log(input);
	}
}

let write = false;
let content, out;
if (argv[2] == "--out") {
	write = true;
	content = argv[4];
	out = argv[3];
} else {
	content = argv[2];
}

if (validUrl.isUri(content)) {
	webCat(content);
} else {
	cat(content);
}
