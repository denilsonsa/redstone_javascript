function new_table_grid(width, height) {
	// Makes a new table grid and returns it.

	var table = document.createElement('table');
	table.setAttribute('class', 'grid');
	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	for(var i=0; i < height; i++) {
		var tr = document.createElement('tr');
		tr.setAttribute('class', 'row'+i);
		tbody.appendChild(tr);
		for(var j=0; j < width; j++) {
			var td = document.createElement('td');
			td.setAttribute('class', 'row'+i + ' col'+j);
			tr.appendChild(td);
		}
	}

	return table;
}

function do_something() {
	var maingrid = document.getElementById('maingrid');
	maingrid.appendChild(new_table_grid(16,8))
}

window.addEventListener('load', do_something, false);
