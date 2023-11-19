"use strict";

/**
 * A function that will replace all "$ + number" with parameter at that location
 * @param {string} str
 * @param  {...any} args
 * @returns {string} the updated input string
 */
function sprintf(str, ...args) {
	for (let i = 0; i < args.length; i++) {
		let symbol = "$" + (i + 1);
		str = str.replace(symbol, args[i]);
	}

	return str;
}

/**
 * A function for improving performance
 * @param {function} callback
 * @param {number} delay
 * @returns {void}
 */
function debounce(callback, delay) {
	let timeout;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(callback, delay);
	};
}

function main() {
	const overlay = document.querySelector(".search-overlay");
	/** @type {HTMLInputElement} */
	const input = document.querySelector("#overlay-input");
	const suggestionWrapper = document.querySelector(".overlay-suggestion-wrapper");
	const suggestionList = document.querySelector("#overlay-suggestion");
	const DDG_URL = "https://duckduckgo.com/?q=$1&atb=v404-3&ia=web";

	// full search API: "https://api.duckduckgo.com/?q=<keywords>&format=json"
	// quick suggestions (CORS FAILING): "https://api.duckduckgo.com/ac/?q=<keywords>"

	window.addEventListener("keyup", (e) => {
		const key = e.key;

		if (key === "Escape") {
			if (overlay.classList.contains("active")) {
				overlay.classList.remove("active");
				input.value = "";
			}
			return;
		}

		if (key !== "Escape" && !overlay.classList.contains("active")) {
			overlay.classList.add("active");
		}

		input.focus();

		if (key === "Enter") {
			const target = sprintf(DDG_URL, input.value.replace(" ", "+"));
			location = target;
		}
	});
}

window.addEventListener("load", main);
