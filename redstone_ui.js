// This file defines the User-Interface and everything browser-related.

// JSLint comments:
/*global add_class, remove_class, has_class, toggle_class, parseIntOrDefault, parseFloatOrDefault, Map, simple_tab_init, document, window, alert */
/*jslint white: true, onevar: false, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, maxerr: 50, maxlen: 78, indent: 4 */

var global_map;
var main_tabs;
var dynamic_mapgrid_stylesheet;


function init_dynamic_mapgrid_stylesheet() {
	// *sigh*... I wish document.createCSSStyleSheet() was supported...

	dynamic_mapgrid_stylesheet = document.createElement('style');
	dynamic_mapgrid_stylesheet.setAttribute('type', 'text/css');

	var head = document.querySelector('head');
	head.appendChild(dynamic_mapgrid_stylesheet);
}
function update_dynamic_mapgrid_stylesheet() {
	var main_grid = document.getElementById('main_grid');
	var checked_radio = document.querySelector('#map_view_style input[type=radio][name=style]:checked');

	var hoff_el = document.querySelector('#map_view_style input[name=hor_offset]');
	var voff_el = document.querySelector('#map_view_style input[name=vert_offset]');
	var hoff = parseIntOrDefault(hoff_el.value, 0);
	var voff = parseIntOrDefault(voff_el.value, 0);

	var s = '';

	// Pattern for matching (and removing) all classes added by this function.
	var pattern = /\bmap_view[\-a-zA-Z0-9_]*\b/;
	remove_class(main_grid, pattern);

	// Yeah, I know .innerHTML is not part of any standard.
	// But it's damn handy here.

	// Setting the opacity of each map layer background
	var bg_opacity_el = document.querySelector('#map_view_style input[name=bg_opacity]');
	var fg_opacity_el = document.querySelector('#map_view_style input[name=fg_opacity]');
	var border_opacity_el = document.querySelector('#map_view_style input[name=border_opacity]');
	var bg_opacity = parseFloatOrDefault(bg_opacity_el.value, 0.5);
	var fg_opacity = parseFloatOrDefault(fg_opacity_el.value, 0.5);
	var border_opacity = parseFloatOrDefault(border_opacity_el.value, 0.5);
	s += 'table.grid {'
		+ '  background-color: rgba(255, 255, 255, ' + bg_opacity + ');'
		+ '  opacity: ' + fg_opacity + ';'
		+ '}'
		+ 'table.grid > tbody > tr > td {'
		+ '  border-color: rgba(0, 0, 0, ' + border_opacity + ');'
		+ '}';

	// Selecting the desired map layout
	if (checked_radio.value === 'below') {
		add_class(main_grid, 'map_view_below');

		if (voff < 0) {
			voff = 0;
		}

		s += '#main_grid.map_view_below table.grid {'
			+ '  margin-bottom: ' + voff + 'px;'
			+ '}';
		dynamic_mapgrid_stylesheet.innerHTML = s;

	} else if (checked_radio.value === 'side_by_side') {
		add_class(main_grid, 'map_view_side_by_side');

		if (hoff < 0) {
			hoff = 0;
		}
		if (voff < 0) {
			voff = 0;
		}

		s += '#main_grid.map_view_side_by_side table.grid {'
			//	+ '  float: left;'
			+ '  display: inline-table;'
			+ '  margin-right: ' + hoff + 'px;'
			+ '  margin-bottom: ' + voff + 'px;'
			+ '}';
		dynamic_mapgrid_stylesheet.innerHTML = s;

	} else if (checked_radio.value === 'stacking') {
		add_class(main_grid, 'map_view_stacking');

		s += '#main_grid.map_view_stacking table.grid {'
			+ '  position: absolute;'
			+ '}';

		var hstart = 0;
		var vstart = 0;
		if (hoff < 0) {
			hstart = (global_map.depth - 1) * (-hoff);
		}
		if (voff < 0) {
			vstart = (global_map.depth - 1) * (-voff);
		}
		var i;
		for (i = 0; i < global_map.depth; i++) {
			s += '#main_grid.map_view_stacking table.grid.depth' + i + ' {'
				+ '  left: ' + (hstart + hoff * i) + 'px;'
				+ '  top: ' + (vstart + voff * i) + 'px;'
				+ '}';
		}
		dynamic_mapgrid_stylesheet.innerHTML = s;
	}
}





function render_map_to_interface() {
	// Renders the 'global_map' to the '#main_grid'

	var main_grid = document.getElementById('main_grid');

	global_map.create_tables().forEach(function (el, index, array) {
		main_grid.appendChild(el);
	});

	// Update the dynamic styles, as it might be needed if the map changes
	// dimensions
	update_dynamic_mapgrid_stylesheet();
}

function destroy_map() {
	// Destroy the 'global_map' and their HTML elements.

	global_map.destroy_tables();
	global_map.remove_circular_references();

	global_map = undefined;
}




function ui_init() {
	var i;

	main_tabs = simple_tab_init('main_tabs', 'map_view');

	// Disabling meaningless form submit
	function prevent_action(ev) {
		ev.preventDefault();
	}
	var forms = document.querySelectorAll('#leftcolumn form');
	for (i = 0; i < forms.length; i++) {
		forms[i].addEventListener('submit', prevent_action, false);
	}

	// "Map view style" interface
	init_dynamic_mapgrid_stylesheet();

	// Binding events to "Map view style"
	var fields = document.querySelectorAll('#map_view_style input');
	for (i = 0; i < fields.length; i++) {
		// Yes, I know... This is kinda bad, and a bit overkill.
		// It *will* call the function multiple times for the same user action.
		// I know this. It's not very elegant. It's not very efficient.
		// I'm sorry.
		//
		// But until 'forminput' event is available on most browsers, this
		// solution stays, just because there is no other solution as simple as
		// this one.

		// onchange only fires on blur (but Opera fires it for spinbox too).
		// oninput fires for each keypress or spinbox action, but doesn't fire
		//   for radio box (except in Opera, that appears to fire for
		//   everything).
		fields[i].addEventListener('change', update_dynamic_mapgrid_stylesheet, false);
		fields[i].addEventListener('input', update_dynamic_mapgrid_stylesheet, false);
	}
	// Someday in future... Just this event would be enough!
	// It is already enough in Opera 11.
	// var form = document.getElementById('map_view');
	// form.addEventListener('forminput', update_dynamic_mapgrid_stylesheet, false);

	// I should have a "New map" button somewhere...
	global_map = new Map(2, 10, 8);
	render_map_to_interface();
}

window.addEventListener('load', ui_init, false);



// Some quick-and-dirty interface for quick experiments
// Should be replaced later!
function import_json_clicked() {
	var import_export_textarea = document.getElementById('import_export_textarea');
	var str = import_export_textarea.value;
	var json_obj;

	try {
		json_obj = JSON.parse(str);
	} catch (e) {
		alert(e);
	}

	if (json_obj) {
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
