function add_class(element, className) {
	// Based on: http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript/196038#196038
	element.className += ' ' + className;
}

function remove_class(element, className) {
	// Based on: http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript/196038#196038
	element.className = element.className.replace(new RegExp('\\b'+className+'\\b','');
}
