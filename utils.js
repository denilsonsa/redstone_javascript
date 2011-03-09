// Add/remove a CSS class from an element.
// Code based on:
// http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript/196038#196038
function add_class(element, className) {
	element.className += ' ' + className;
}
function remove_class(element, className) {
	var pattern;
	if (className instanceof RegExp) {
		pattern = className;
	} else {
		pattern = new RegExp('\\b' + className + '\\b', 'g');
	}
	// Removes the class, and then also removes duplicate space chars
	element.className = element.className.replace(pattern, '').replace(/ {2,}/g, ' ');
}
function has_class(element, className) {
	var pattern = new RegExp('\\b' + className + '\\b');
	return pattern.test(element.className);
}
function toggle_class(element, className) {
	if (has_class(element, className)) {
		remove_class(element, 'collapsed');
	} else {
		add_class(element, 'collapsed');
	}
}

function parseIntOrDefault(s, default_value) {
	// Converts a string to an integer (using base 10) and returns it.
	// If the string can't be converted, returns a supplied default_value
	// (instead of parseInt() behavior of returning NaN).

	var r = parseInt(s, 10);
	if (isNaN(r)) {
		r = default_value;
	}
	return r;
}
function parseFloatOrDefault(s, default_value) {
	// Converts a string to a float and returns it.
	// If the string can't be converted, returns a supplied default_value
	// (instead of parseFloat() behavior of returning NaN).

	var r = parseFloat(s);
	if (isNaN(r)) {
		r = default_value;
	}
	return r;
}


// If the browser doesn't have Array.forEach, let's add it.
// This code is copied from:
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
if (!Array.prototype.forEach)
{
	Array.prototype.forEach = function(fun /*, thisp */)
	{
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
			if (i in t)
				fun.call(thisp, t[i], i, t);
		}
	};
}
