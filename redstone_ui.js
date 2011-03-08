// This file defines the User-Interface and everything browser-related.


var global_map;

function render_map_to_interface() {
	var maingrid = document.getElementById('maingrid');

	global_map.create_tables().forEach( function(el, index, array){
		maingrid.appendChild(el);
	});
}

function destroy_map() {
	global_map.destroy_tables();
	global_map.remove_circular_references();

	global_map = undefined;
}



function do_something() {
	global_map = new Map(2, 10, 8);
	render_map_to_interface();
}

window.addEventListener('load', do_something, false);


// Some quick-and-dirty interface for quick experiments
// Should be replaced later!
function map_view_clicked() {
	var maingrid = document.getElementById('maingrid');
	var saveloadarea = document.getElementById('saveloadarea');

	maingrid.style.visibility = 'visible';
	saveloadarea.style.visibility = 'hidden';
}
function json_view_clicked() {
	var maingrid = document.getElementById('maingrid');
	var saveloadarea = document.getElementById('saveloadarea');

	maingrid.style.visibility = 'hidden';
	saveloadarea.style.visibility = 'visible';
}
function import_json_clicked() {
	var saveloadtextarea = document.getElementById('saveloadtextarea');
	var str = saveloadtextarea.value;
	var json_obj;

	try {
		json_obj = JSON.parse(str);
	} catch(e) {
		alert(e);
	}

	if(json_obj) {
		destroy_map();
		global_map = new Map(json_obj);
		render_map_to_interface();
	}
}
