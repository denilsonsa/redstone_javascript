// This file implements a simple collapsable fieldset

// JSLint comments:
/*global add_class, remove_class, has_class, toggle_class, document, window */
/*jslint white: true, onevar: false, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, maxerr: 50, maxlen: 78, indent: 4 */

// How to use
//
// Just add "collapsable" class to the desired fieldsets.
// Also add "collapsed" class if you want it already collapsed.
//
// <fieldset class="collapsable">
//    <legend>Some description</legend>
//    ...
// </fieldset>


function toggle_collapsable_fieldset(ev) {
	if (ev.target.tagName.toLowerCase() !== 'legend') {
	//	console.error('toggle_collapsable_fieldset() called with target=', ev.target);
		return;
	}
	var fieldset = ev.target.parentNode;
	if (fieldset.tagName.toLowerCase() !== 'fieldset') {
	//	console.error('toggle_collapsable_fieldset() called, but parentNode is not a fieldset: ', fieldset);
		return;
	}

	if (has_class(fieldset, 'collapsable')) {
		toggle_class(fieldset, 'collapsed');
	}

	ev.preventDefault();
}
function init_collasable_fieldsets() {
	// Adding event handlers to collapsable fieldsets
	var fs_legends = document.querySelectorAll('fieldset.collapsable > legend');
	var i;
	for (i = 0; i < fs_legends.length; i++) {
		fs_legends[i].addEventListener('click', toggle_collapsable_fieldset, false);
	}
}
window.addEventListener('load', init_collasable_fieldsets, false);
