// This file defines the basic data objects and data structures.


// The Map object
//
// A Map is composed of Grid objects, which are composed of Cell objects.
// Each "layer" of the map is a Grid object.
function Map(depth, height, width) {
	// Constructor parameters:
	//   depth, height, width => the map dimensions
	this.depth = depth;
	this.width = width;
	this.height = height;

	this.grids = new Array(depth);

	for(var i=0; i < depth; i++) {
		this.grids[i] = new Grid(this, i, height, width);
	}
}
Map.prototype.create_tables = function() {
	// Creates a <table> for each grid and returns an Array of such tables.
	var tables = new Array(this.depth);
	for(var i=0; i < this.depth; i++) {
		tables[i] = this.grids[i].create_table();
	}
	return tables;
}

// The Grid object
//
// A Grid is a 2-dimensional matrix of Cells.
function Grid(map, z, height, width) {
	// Constructor parameters:
	//   map  => a reference to the map
	//   z    => the z coordinate for this grid
	//   height, width => the map dimensions

	// Back reference to the associated Map
	this.map = map;

	this.z = z;

	this.width = width;
	this.height = height;

	this.cells = new Array(height);

	for(var i=0; i < height; i++) {
		this.cells[i] = new Array(width);
		for(var j=0; j < width; j++) {
			this.cells[i][j] = new Cell(this, z, i, j);
		}
	}
}
Grid.prototype.create_table = function() {
	// Creates a new <table> grid and returns it.

	var table = document.createElement('table');
	table.className = 'grid depth'+this.z;
	table.map_object = this.map;
	table.grid_object = this;

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	for(var i=0; i < this.height; i++) {
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		for(var j=0; j < this.width; j++) {
			var td = document.createElement('td');
			td.className = 'cell cell_' + this.cells[i][j].block;
			td.cell_object = this.cells[i][j];
			tr.appendChild(td);
		}
	}

	return table;
}

// The Cell object
//
// A Cell represents a block from Minecraft.
function Cell(grid, z, y, x) {
	// Back references to the associated Map and Grid
	this.map = grid.map;
	this.grid = grid;

	this.z = z;
	this.y = y;
	this.x = x;

	// These two properties should be read-only!
	// If you want to change the block, please use the .set() method!
	this.block = BLOCK.AIR;
	this.type = BLOCK_TYPE.AIR;
}
Cell.prototype.set = function(block_name) {
	this.block = block_name;
	this.type = BLOCK_TO_BLOCK_TYPE[block_name];
}
