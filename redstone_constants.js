// This file defines some constants that are used by the rest of the code.

// JSLint comments:
/*jslint undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, maxerr: 50, maxlen: 78 */

// This table is manually written.
var RAW_BLOCK_TABLE = [

	// [ 'block_type_here', [
	//     'all_possible_block_values',
	//     'that_map_to_the_same_type'
	// ]],

	// Simple blocks:
	['air', [
		'air'
	]],

	['solid', [
		'dirt',
		'sand',
		'wool_0',
		'wool_1',
		'wool_2',
		'wool_3',
		'wool_4',
		'wool_5',
		'wool_6',
		'wool_7',
		'wool_8',
		'wool_9',
		'wool_a',
		'wool_b',
		'wool_c',
		'wool_d',
		'wool_e',
		'wool_f'
	]],

	// Switches:
	['plate', [
		'plate_wood',
		'plate_stone'
	]],

	['button', [
		'button_n',
		'button_e',
		'button_s',
		'button_w'
	]],

	['lever', [
		'lever_up',
		'lever_n',
		'lever_e',
		'lever_s',
		'lever_w'
	]],

	// Redstone:
	['torch', [
		'torch_up',
		'torch_n',
		'torch_e',
		'torch_s',
		'torch_w'
	]],

	['repeater', [
		'repeater_n',
		'repeater_e',
		'repeater_s',
		'repeater_w'
	]],

	['wire', [
		'wire_n',
		'wire_e',
		'wire_s',
		'wire_w',

		'wire_ns',
		'wire_ew',

		'wire_ne',
		'wire_nw',
		'wire_se',
		'wire_sw',

		'wire_nse',
		'wire_nsw',
		'wire_new',
		'wire_sew',

		'wire_nsew'
	]]  // No comma after the last element!

];


// BLOCK_TO_BLOCK_TYPE is an associative array (AKA dict) that maps each
// block to its block type. It's kinda reverse of RAW_BLOCK_TABLE.
// Sample usage:
//   BLOCK_TO_BLOCK_TYPE['torch_n']  ==>  'torch'
var BLOCK_TO_BLOCK_TYPE = {};

// BLOCK is a namespace for all block names.
// Sample usage:
//   BLOCK.TORCH_N  ==>  'torch_n'
var BLOCK = {};

// BLOCK_TYPE is a namespace for all block types.
// Sample usage:
//   BLOCK_TYPE.TORCH  ==>  'torch'
var BLOCK_TYPE = {};


// This function fills the above vars using the values from
// RAW_BLOCK_TABLE.
(function () {
	var i, j;
	for (i = 0; i < RAW_BLOCK_TABLE.length; i++) {
		var block_type = RAW_BLOCK_TABLE[i][0];
		var blocks = RAW_BLOCK_TABLE[i][1];

		BLOCK_TYPE[block_type.toUpperCase()] = block_type;

		for (j = 0; j < blocks.length; j++) {
			var name = blocks[j];
			BLOCK_TO_BLOCK_TYPE[name] = block_type;
			BLOCK[name.toUpperCase()] = name;
		}
	}
})();
