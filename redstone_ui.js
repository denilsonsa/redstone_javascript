// This file defines the User-Interface and everything browser-related.


var global_map;
var main_tabs;

function render_map_to_interface() {
	var main_grid = document.getElementById('main_grid');

	global_map.create_tables().forEach( function(el, index, array){
		main_grid.appendChild(el);
	});
}

function destroy_map() {
	global_map.destroy_tables();
	global_map.remove_circular_references();

	global_map = undefined;
}



function do_something() {
	main_tabs = simple_tab_init('main_tabs', 'main_grid');

	global_map = new Map(2, 10, 8);
	render_map_to_interface();
}

window.addEventListener('load', do_something, false);


// Some quick-and-dirty interface for quick experiments
// Should be replaced later!
function import_json_clicked() {
	var import_export_textarea = document.getElementById('import_export_textarea');
	var str = import_export_textarea.value;
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
function export_json_clicked() {
	var import_export_textarea = document.getElementById('import_export_textarea');
	import_export_textarea.value = JSON.stringify(global_map);
}
function export_pretty_json_clicked() {
	var import_export_textarea = document.getElementById('import_export_textarea');
	import_export_textarea.value = JSON.stringify(global_map, null, '\t');
}
function clear_json_clicked() {
	var import_export_textarea = document.getElementById('import_export_textarea');
	import_export_textarea.value = '';
}
