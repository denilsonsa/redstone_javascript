// This code was inspired by:
// http://www.pinceladasdaweb.com.br/blog/2010/01/13/javascript-tabs-sem-framework-ou-plugin/

// JSLint comments:
/*global add_class, remove_class, document */
/*jslint white:true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, maxerr: 50, maxlen: 78, indent: 4 */

// How to use
//
// Add HTML similar to this:
//   <ul id="my_tabs" class="simple_tab_menu">
//     <li><a href="#view_tab">View</a></li>
//     <li><a href="#edit_tab">Edit</a></li>
//   </ul>
//   <div id="view_tab" class="simple_tab_body"></div>
//   <div id="edit_tab" class="simple_tab_body"></div>
//
// Then call this code onload:
//   simple_tab_init('my_tabs', 'view_tab');


function SimpleTab(tab_list) {
	// 'tab_list' is a simple array
	// Each element has three properties:
	//   'id'   => string, the name of this tab
	//   'link' => HTML <a> element; remember you can reach the <li> by using
	//             .parentNode
	//   'body' => HTML element (usually a <div>) that is the tab body
	this.tab_list = tab_list;

	// 'tabs' is an associative array
	// Given an 'id', it maps to the same thing as 'tab_list'
	this.tabs = {};

	// 'self' is used in this inner function
	var self = this;
	function click_handler(ev) {
		var id = this.getAttribute('href').replace(/^#/, '');
		self.set_active(id);
		ev.preventDefault();
	}

	var i;
	for (i = 0; i < this.tab_list.length; i++) {
		var el = this.tab_list[i];

		// Filling 'tabs'
		this.tabs[el.id] = el;

		// Adding some event handlers
		el.link.addEventListener('click', click_handler, false);
	}
}
SimpleTab.prototype.set_active = function (active_id) {
	this.tab_list.forEach(function (el, index, array) {
		if (el.id === active_id) {
			// Adding a class to <li>
			add_class(el.link.parentNode, 'active');
			el.body.style.visibility = 'visible';
		} else {
			// Removing the class from <li>
			remove_class(el.link.parentNode, 'active');
			el.body.style.visibility = 'hidden';
		}
	});
};

function simple_tab_init(tab_menu_id, active_tab_id) {
	// Initializes a SimpleTab.
	//
	// 'active_tab_id' is an optional argument (but recommended)
	//
	// Returns a SimpleTab object, so it's possible to control the tab system
	// by calling .set_active('tab_id') on that object.

	var links = document.querySelectorAll('#' + tab_menu_id + ' > li > a');
	var tab_list = [];

	var i;
	for (i = 0; i < links.length; i++) {
		var a = links[i];
		var href = a.getAttribute('href');
		if (href.charAt(0) === '#') {
			// Get the id from the link
			// href="#my_id" gets extracted to "my_id"
			var id = href.replace(/^#/, '');
			tab_list.push({
				'id': id,
				'link': a,
				'body': document.getElementById(id)
			});
		}
	}

	var simple_tab = new SimpleTab(tab_list);

	if (active_tab_id) {
		simple_tab.set_active(active_tab_id);
	}

	return simple_tab;
}

