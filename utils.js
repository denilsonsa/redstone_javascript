function add_class(element, className) {
	// Based on: http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript/196038#196038
	element.className += ' ' + className;
}

function remove_class(element, className) {
	// Based on: http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript/196038#196038
	element.className = element.className.replace(new RegExp('\\b'+className+'\\b',''));
}

// This code is copied from:
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisp, t[i], i, t);
    }
  };
}
