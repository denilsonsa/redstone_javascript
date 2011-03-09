// This file defines the basic data objects and data structures.

// Outside this file, only Map constructor should be used. All other
// constructors (Grid and Cell) should only be used within this file.

// JSLint comments:
/*global BLOCK, BLOCK_TYPE, BLOCK_TO_BLOCK_TYPE, add_class, remove_class, document */
/*jslint undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, maxerr: 50, maxlen: 78 */


// The Cell object
//
// A Cell represents a block from Minecraft.
function Cell(grid, z, y, x) {
	// Back references to the associated Map and Grid
	this.map = grid.map;
	this.grid = grid;

	// Reference to the HTML element
	this.td_element = undefined;

	this.z = z;
	this.y = y;
	this.x = x;

	// These two properties should be read-only!
	// If you want to change the block, please use the .set() method!
	this.block = BLOCK.AIR;
	this.type = BLOCK_TYPE.AIR;
}
Cell.prototype.toJSON = function() {
	return {
		//'z': this.z,
		//'y': this.y,
		//'x': this.x,
		//'type': this.type,
		'block': this.block
	};
};
Cell.prototype.set = function(block_name) {
	if( this.td_element ) {
		remove_class(this.td_element, 'cell_'+this.block);
		add_class(this.td_element, 'cell_'+block_name);
	}

	this.block = block_name;
	this.type = BLOCK_TO_BLOCK_TYPE[block_name];
};
Cell.prototype.remove_circular_references = function() {
	// This function aims to aid garbage collection, and should be called
	// whenever this object is not needed anymore.
	this.map = undefined;
	this.grid = undefined;
};
Cell.prototype.remove_html_references = function() {
	// This function removes the double-linked references between JavaScript
	// objects and HTML elements.
	delete this.td_element.cell_object;
	this.td_element = undefined;
};


// The Grid object
//
// A Grid is a 2-dimensional matrix of Cells.
function Grid(map, z, height, width, json_data) {
	// Constructor parameters:
	//   map  => a reference to the map
	//   z    => the z coordinate for this grid
	//   height, width => the map dimensions
	//   json_data => optional parameter, if supplied, will fill the
	//                this.cells array with data from this JSON object

	// Back reference to the associated Map
	this.map = map;

	// Reference to the HTML element
	this.table_element = undefined;

	this.z = z;

	this.width = width;
	this.height = height;

	this.cells = new Array(height);

	var i,j;
	for(i=0; i < height; i++) {
		this.cells[i] = new Array(width);
		for(j=0; j < width; j++) {
			this.cells[i][j] = new Cell(this, z, i, j);
			if( json_data ) {
				this.cells[i][j].set(json_data.cells[i][j].block);
			}
		}
	}
}
Grid.prototype.toJSON = function() {
	return {
		//'z': this.z,
		//'width': this.width,
		//'height': this.height,
		'cells': this.cells
	};
};
Grid.prototype.create_table = function() {
	// Creates a new <table> grid and returns it.

	var table = document.createElement('table');
	table.className = 'grid depth'+this.z;

	// Creating some double-linked references, so the HTML element
	// points back to the JavaScript object, and vice-versa.
	table.map_object = this.map;
	table.grid_object = this;
	this.table_element = table;

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	var i, j;
	for(i=0; i < this.height; i++) {
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		for(j=0; j < this.width; j++) {
			var td = document.createElement('td');
			td.className = 'cell cell_' + this.cells[i][j].block;

			// Creating some double-linked references, so the HTML element
			// points back to the JavaScript object, and vice-versa.
			td.cell_object = this.cells[i][j];
			this.cells[i][j].td_element = td;

			tr.appendChild(td);
		}
	}

	return table;
};
Grid.prototype.destroy_table = function() {
	// Destroy the associated HTML table and remove the related references
	// from objects.

	if( this.table_element ) {
		var table = this.table_element;
		this.remove_html_references();
		table.parentNode.removeChild(table);
	}
};
Grid.prototype.remove_circular_references = function() {
	// This function aims to aid garbage collection, and should be called
	// whenever this object is not needed anymore.
	var i, j;
	for(i=0; i < this.height; i++) {
		for(j=0; j < this.width; j++) {
			this.cells[i][j].remove_circular_references();
		}
	}

	this.map = undefined;
};
Grid.prototype.remove_html_references = function() {
	// This function removes the double-linked references between JavaScript
	// objects and HTML elements.

	var i,j;
	for(i=0; i < this.height; i++) {
		for(j=0; j < this.width; j++) {
			this.cells[i][j].remove_html_references();
		}
	}

	delete this.table_element.map_object;
	delete this.table_element.grid_object;
	this.table_element = undefined;
};


// The Map object
//
// A Map is composed of Grid objects, which are composed of Cell objects.
// Each "layer" of the map is a Grid object.
function Map(depth_or_json, height, width) {
	// new Map(depth, height, width)
	//   depth, height, width => the map dimensions
	//
	// new Map(json_object)
	//   json_object => JSON object to be converted to Map

	var depth;
	var is_json;

	if( height === undefined && width === undefined ) {
		// Let's assume the first argument is a JSON object
		is_json = true;

		depth = depth_or_json.depth;
		height = depth_or_json.height;
		width = depth_or_json.width;
	}
	else if( height === undefined || width === undefined ) {
		throw new Error('Incorrect parameters');
	}
	else {
		is_json = false;
		depth = depth_or_json;
	}

	this.depth = depth;
	this.height = height;
	this.width = width;

	this.grids = new Array(depth);

	var i;
	for(i=0; i < depth; i++) {
		if( is_json ) {
			this.grids[i] = new Grid(this, i, height, width, depth_or_json.grids[i]);
		}
		else {
			this.grids[i] = new Grid(this, i, height, width);
		}
	}
}
Map.prototype.toJSON = function() {
	return {
		'depth': this.depth,
		'height': this.height,
		'width': this.width,
		'grids': this.grids
	};
};
Map.prototype.create_tables = function() {
	// Creates a <table> for each grid and returns an Array of such tables.
	var tables = new Array(this.depth);
	var i;
	for(i=0; i < this.depth; i++) {
		tables[i] = this.grids[i].create_table();
	}
	return tables;
};
Map.prototype.destroy_tables = function() {
	// Destroy the associated HTML tables and remove the related references
	// from objects.
	var i;
	for(i=0; i < this.depth; i++) {
		this.grids[i].destroy_table();
	}
};
Map.prototype.remove_circular_references = function() {
	// This function aims to aid garbage collection, and should be called
	// whenever this object is not needed anymore.
	var i;
	for(i=0; i < this.depth; i++) {
		this.grids[i].remove_circular_references();
	}
};
Map.prototype.remove_html_references = function() {
	var i;
	for(i=0; i < this.depth; i++) {
		this.grids[i].remove_html_references();
	}
};
