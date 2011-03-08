// The Map object
function Map(depth, height, width) {
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
function Grid(map, current_depth, height, width) {
	// Back reference to the associated Map
	this.map = map;
	this.z = current_depth;

	this.width = width;
	this.height = height;

	this.cells = new Array(height);
	for(var i=0; i < height; i++) {
		this.cells[i] = new Array(width);
		for(var j=0; j < width; j++) {
			this.cells[i][j] = new Air();
			this.cells[i][j].set_back_references(this, this.z, i, j);
		}
	}
}
Grid.prototype.create_table = function() {
	// Creates a new <table> grid and returns it.

	var table = document.createElement('table');
	table.className = 'grid depth'+this.z;
	table.grid_object = this;

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	for(var i=0; i < this.height; i++) {
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		for(var j=0; j < this.width; j++) {
			var td = document.createElement('td');
			td.className = 'cell cell_' + this.cells[i][j].data;
			td.cell_object = this.cells[i][j];
			tr.appendChild(td);
		}
	}

	return table;
}

// The Cell object
function Cell() {
	this.type = 0;
	this.data = 0;
}
Cell.prototype.set_back_references = function(grid, z, y, x) {
	this.grid = grid;
	this.z = z;
	this.y = y;
	this.x = x;
}

function Air() {
	this.type = CELL_TYPE.AIR;
	this.data = CELL_DATA.AIR;
}
Air.prototype = new Cell();

function Wire() {
	this.type = CELL_TYPE.WIRE;
	this.data = CELL_DATA.WIRE_NSEW;
}
Wire.prototype = new Cell();

// Cell constants
function CellTypes() {
	this.AIR = 'air';
	this.SOLID = 'solid';
	// Redstone:
	this.TORCH = 'torch';
	this.WIRE = 'wire';
	this.REPEATER = 'repeater';
	// Switches:
	this.BUTTON = 'button';
	this.LEVER = 'lever';
	this.PLATE = 'plate';
}
CELL_TYPE = new CellTypes();

function CellData() {
	this.AIR = 'air';

	this.DIRT = 'dirt';
	this.SAND = 'sand';

	this.PLATE_WOOD  = 'plate_wood';
	this.PLATE_STONE = 'plate_stone';

	this.BUTTON_N = 'button_n';
	this.BUTTON_E = 'button_e';
	this.BUTTON_S = 'button_s';
	this.BUTTON_W = 'button_w';

	this.REPEATER_N = 'repeater_n';
	this.REPEATER_E = 'repeater_e';
	this.REPEATER_S = 'repeater_s';
	this.REPEATER_W = 'repeater_w';

	this.LEVER_UP = 'lever_up';
	this.LEVER_N  = 'lever_n';
	this.LEVER_E  = 'lever_e';
	this.LEVER_S  = 'lever_s';
	this.LEVER_W  = 'lever_w';

	this.TORCH_UP = 'torch_up';
	this.TORCH_N  = 'torch_n';
	this.TORCH_E  = 'torch_e';
	this.TORCH_S  = 'torch_s';
	this.TORCH_W  = 'torch_w';

	this.WIRE_N  = 'wire_n';
	this.WIRE_E  = 'wire_e';
	this.WIRE_S  = 'wire_s';
	this.WIRE_W  = 'wire_w';

	this.WIRE_NS = 'wire_ns';
	this.WIRE_EW = 'wire_ew';

	this.WIRE_NE = 'wire_ne';
	this.WIRE_NW = 'wire_nw';
	this.WIRE_SE = 'wire_se';
	this.WIRE_SW = 'wire_sw';

	this.WIRE_NSE = 'wire_nse';
	this.WIRE_NSW = 'wire_nsw';
	this.WIRE_NEW = 'wire_new';
	this.WIRE_SEW = 'wire_sew';

	this.WIRE_NSEW = 'wire_nsew';
}
CELL_DATA = new CellData();


function do_something() {
	var maingrid = document.getElementById('maingrid');
	var map = new Map(2, 10, 8);

	map.create_tables().forEach( function(el, index, array){
		maingrid.appendChild(el);
	});
}

window.addEventListener('load', do_something, false);
