// This file defines the User-Interface and everything browser-related.


function do_something() {
	var maingrid = document.getElementById('maingrid');
	var map = new Map(2, 10, 8);

	map.create_tables().forEach( function(el, index, array){
		maingrid.appendChild(el);
	});
}

window.addEventListener('load', do_something, false);
