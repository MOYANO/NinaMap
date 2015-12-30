(function ($) {
var _ = $.layout;

// make sure the callbacks branch exists
if (!_.callbacks) _.callbacks = {};

_.callbacks.resizePaneAccordions = function (x, ui) {
	App.map.invalidateSize;
};
})( jQuery );